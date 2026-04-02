-- Migration script to update contacts table for new status system and reply functionality
-- Run this if you already have a contacts table

-- Step 1: Add new columns if they don't exist
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS admin_reply TEXT,
ADD COLUMN IF NOT EXISTS replied_at TIMESTAMP WITH TIME ZONE;

-- Step 2: Drop the old constraint completely
ALTER TABLE contacts 
DROP CONSTRAINT IF EXISTS contacts_status_check;

-- Step 3: Update ALL existing rows to use new status values
-- This ensures no old values remain
UPDATE contacts 
SET status = CASE 
  WHEN status = 'new' THEN 'unread'
  WHEN status = 'in_progress' THEN 'read'
  WHEN status = 'completed' THEN 'replied'
  WHEN status = 'archived' THEN 'archived'
  ELSE 'unread'  -- Default for any unexpected values
END;

-- Step 4: Now add the new constraint (all data is already compliant)
ALTER TABLE contacts 
ADD CONSTRAINT contacts_status_check 
CHECK (status IN ('unread', 'read', 'replied', 'archived'));

-- Step 5: Update the updated_at timestamp
UPDATE contacts SET updated_at = NOW();

-- Step 6: Verify the changes
SELECT 
  'Migration complete!' as message,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'unread') as unread,
  COUNT(*) FILTER (WHERE status = 'read') as read,
  COUNT(*) FILTER (WHERE status = 'replied') as replied,
  COUNT(*) FILTER (WHERE status = 'archived') as archived
FROM contacts;
