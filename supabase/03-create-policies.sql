-- Step 3: Create RLS Policies (Email-based admin access)

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert own contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can update all contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON analytics_events;
DROP POLICY IF EXISTS "Admins can view all analytics events" ON analytics_events;

-- Contacts policies
CREATE POLICY "Users can insert own contacts" ON contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin can view all contacts (using email check)
CREATE POLICY "Admins can view all contacts" ON contacts
  FOR SELECT USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin can update all contacts (using email check)
CREATE POLICY "Admins can update all contacts" ON contacts
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin users policies (optional - can keep for future use)
CREATE POLICY "Admins can view admin_users" ON admin_users
  FOR SELECT USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Analytics policies
CREATE POLICY "Anyone can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events" ON analytics_events
  FOR SELECT USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );
