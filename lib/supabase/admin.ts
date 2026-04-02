import { createClient } from './client';

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  admin_reply?: string;
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_data?: any;
  user_id?: string;
  created_at: string;
}

// List of admin emails
const ADMIN_EMAILS = [
  'csaprintanddesign@gmail.com'
];

// Check if user is admin by email
export async function isAdmin(userEmail?: string | null): Promise<boolean> {
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}

// Get all contacts
export async function getContacts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Contact[];
}

// Update contact status
export async function updateContactStatus(contactId: string, status: Contact['status']) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contacts')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', contactId)
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
}

// Mark contact as read
export async function markContactAsRead(contactId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contacts')
    .update({ status: 'read', updated_at: new Date().toISOString() })
    .eq('id', contactId)
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
}

// Delete contact
export async function deleteContact(contactId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', contactId);

  if (error) throw error;
}

// Delete multiple contacts
export async function deleteMultipleContacts(contactIds: string[]) {
  const supabase = createClient();
  const { error } = await supabase
    .from('contacts')
    .delete()
    .in('id', contactIds);

  if (error) throw error;
}

// Reply to contact
export async function replyToContact(contactId: string, replyMessage: string, userEmail: string) {
  const supabase = createClient();
  
  // Update contact with reply
  const { data, error } = await supabase
    .from('contacts')
    .update({ 
      admin_reply: replyMessage,
      status: 'replied',
      replied_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', contactId)
    .select()
    .single();

  if (error) throw error;

  // Send email via API route
  try {
    const response = await fetch('/api/send-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: userEmail,
        message: replyMessage,
        contactId
      })
    });

    if (!response.ok) {
      console.error('Failed to send email:', await response.text());
    }
  } catch (emailError) {
    console.error('Error sending email:', emailError);
  }

  return data as Contact;
}

// Submit contact form
export async function submitContact(contactData: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const supabase = createClient();
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error getting user:', userError);
    throw new Error(`Authentication error: ${userError.message}`);
  }

  if (!user) {
    throw new Error('User not authenticated. Please sign in again.');
  }

  // Prepare the contact data
  const contactRecord = {
    user_id: user.id,
    name: contactData.name,
    email: contactData.email,
    phone: contactData.phone || null,
    service: contactData.service || null,
    message: contactData.message,
    status: 'unread' as const,
  };

  console.log('Submitting contact:', { ...contactRecord, user_id: '[REDACTED]' });

  // Insert the contact
  const { data, error } = await supabase
    .from('contacts')
    .insert(contactRecord)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to submit contact: ${error.message} (Code: ${error.code})`);
  }

  if (!data) {
    throw new Error('No data returned from contact submission');
  }

  console.log('Contact submitted successfully:', data.id);
  return data as Contact;
}

// Track analytics event
export async function trackEvent(eventType: string, eventData?: any) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('analytics_events')
    .insert({
      event_type: eventType,
      event_data: eventData,
      user_id: user?.id,
    });

  if (error) console.error('Analytics tracking error:', error);
}

// Get analytics data
export async function getAnalytics(days: number = 30) {
  const supabase = createClient();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as AnalyticsEvent[];
}

// Get dashboard stats
export async function getDashboardStats() {
  const supabase = createClient();

  // Get total contacts
  const { count: totalContacts } = await supabase
    .from('contacts')
    .select('*', { count: 'exact', head: true });

  // Get contacts today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: contactsToday } = await supabase
    .from('contacts')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString());

  // Get website visits (from analytics_events)
  const { count: websiteVisits } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'page_view');

  return {
    totalContacts: totalContacts || 0,
    contactsToday: contactsToday || 0,
    websiteVisits: websiteVisits || 0,
  };
}

// Get contacts chart data (last 7 days)
export async function getContactsChartData() {
  const supabase = createClient();
  const days = 7;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const { count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', date.toISOString())
      .lt('created_at', nextDate.toISOString());

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      contacts: count || 0,
    });
  }

  return data;
}

// Get contacts today by hour
export async function getContactsTodayChartData() {
  const supabase = createClient();
  const data = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group by hour for today
  for (let hour = 0; hour < 24; hour++) {
    const startHour = new Date(today);
    startHour.setHours(hour);
    
    const endHour = new Date(today);
    endHour.setHours(hour + 1);

    const { count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startHour.toISOString())
      .lt('created_at', endHour.toISOString());

    if (hour >= 6 && hour <= 23) { // Only show 6 AM to 11 PM
      data.push({
        hour: `${hour % 12 || 12}${hour >= 12 ? 'PM' : 'AM'}`,
        contacts: count || 0,
      });
    }
  }

  return data;
}

// Get website visits chart data (last 7 days)
export async function getWebsiteVisitsChartData() {
  const supabase = createClient();
  const days = 7;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const { count } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'page_view')
      .gte('created_at', date.toISOString())
      .lt('created_at', nextDate.toISOString());

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visits: count || 0,
    });
  }

  return data;
}
