import { createClient } from './client';

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
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
    .update({ status })
    .eq('id', contactId)
    .select()
    .single();

  if (error) throw error;
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
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('contacts')
    .insert({
      user_id: user.id,
      ...contactData,
    })
    .select()
    .single();

  if (error) throw error;
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
