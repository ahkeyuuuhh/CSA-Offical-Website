-- Verification Script for Contact Form Setup
-- Run this in Supabase SQL Editor to verify everything is configured correctly

-- 1. Check if contacts table exists
SELECT 
  'contacts table exists' as check_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'contacts'
  ) THEN '✓ PASS' ELSE '✗ FAIL' END as status;

-- 2. Check if RLS is enabled on contacts table
SELECT 
  'RLS enabled on contacts' as check_name,
  CASE WHEN relrowsecurity THEN '✓ PASS' ELSE '✗ FAIL' END as status
FROM pg_class
WHERE relname = 'contacts';

-- 3. List all policies on contacts table
SELECT 
  'Policy: ' || policyname as check_name,
  '✓ EXISTS' as status
FROM pg_policies
WHERE tablename = 'contacts';

-- 4. Check contacts table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- 5. Count existing contacts
SELECT 
  'Total contacts in database' as metric,
  COUNT(*) as count
FROM contacts;

-- 6. Check if there are any contacts with status 'new'
SELECT 
  'New contacts pending review' as metric,
  COUNT(*) as count
FROM contacts
WHERE status = 'new';

-- Expected Policies:
-- 1. Users can insert own contacts
-- 2. Users can view own contacts
-- 3. Admins can view all contacts
-- 4. Admins can update all contacts

-- If any checks fail, run the setup scripts in order:
-- 1. 01-create-tables.sql
-- 2. 02-enable-rls.sql
-- 3. 03-create-policies.sql
-- 4. 04-create-indexes.sql
