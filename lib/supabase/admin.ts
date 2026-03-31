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

// Check if user is admin
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .single();

  return !error && !!data;
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

  // Get new contacts (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { count: newContacts } = await supabase
    .from('contacts')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  // Get contacts by status
  const { data: statusData } = await supabase
    .from('contacts')
    .select('status');

  const statusCounts = {
    new: 0,
    in_progress: 0,
    completed: 0,
    archived: 0,
  };

  statusData?.forEach((contact) => {
    statusCounts[contact.status as keyof typeof statusCounts]++;
  });

  return {
    totalContacts: totalContacts || 0,
    newContacts: newContacts || 0,
    statusCounts,
  };
}
