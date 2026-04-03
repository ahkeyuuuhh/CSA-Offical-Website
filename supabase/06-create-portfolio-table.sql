-- Create portfolio table for admin to manage portfolio items
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Enable real-time for portfolio table
ALTER PUBLICATION supabase_realtime ADD TABLE portfolio;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admins can insert portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admins can update portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admins can delete portfolio" ON portfolio;

-- Public can view all portfolio items
CREATE POLICY "Anyone can view portfolio" ON portfolio
  FOR SELECT USING (true);

-- Admin can insert portfolio items
CREATE POLICY "Admins can insert portfolio" ON portfolio
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin can update portfolio items
CREATE POLICY "Admins can update portfolio" ON portfolio
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin can delete portfolio items
CREATE POLICY "Admins can delete portfolio" ON portfolio
  FOR DELETE USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at DESC);

-- Insert sample portfolio items (optional - remove if you want to start fresh)
INSERT INTO portfolio (title, category, image_url, description, featured) VALUES
  ('Invitation Cards', 'Print Materials', '/assets/samples-asset/Invitation-cards-sample.jpg', 'Beautiful invitation cards for special events', true),
  ('Magnetic Bookmarks', 'Custom Items', '/assets/samples-asset/magnetic-bookmarks-sample.jpg', 'Custom magnetic bookmarks with unique designs', true),
  ('Magnetic Bookmarks Set', 'Custom Items', '/assets/samples-asset/magnetic-bookmarks-sample2.jpg', 'Complete set of themed magnetic bookmarks', false),
  ('Photocards', 'Print Materials', '/assets/samples-asset/photocards-sample.jpg', 'High-quality photocards with premium finish', true),
  ('Ref Magnets', 'Specialty', '/assets/samples-asset/ref-magnets-sample.jpg', 'Custom refrigerator magnets', false),
  ('Ref Magnets Collection', 'Specialty', '/assets/samples-asset/ref-magnets-sample2.jpg', 'Collection of themed ref magnets', false),
  ('Custom Stickers', 'Custom Items', '/assets/samples-asset/stickers-sample2.jpg', 'Vibrant custom stickers in various shapes', true),
  ('Sticker Designs', 'Custom Items', '/assets/samples-asset/stickers-sample3.jpg', 'Creative sticker designs for any purpose', false)
ON CONFLICT DO NOTHING;
