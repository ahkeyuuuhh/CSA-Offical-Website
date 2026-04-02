-- Quick check to see all current policies on contacts table
-- Run this in Supabase SQL Editor

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'contacts'
ORDER BY policyname;

-- Expected policies:
-- 1. "Admins can update all contacts" - UPDATE
-- 2. "Admins can view all contacts" - SELECT  
-- 3. "Users can insert own contacts" - INSERT
-- 4. "Users can view own contacts" - SELECT

-- If you don't see all 4 policies, run: 03-create-policies.sql
