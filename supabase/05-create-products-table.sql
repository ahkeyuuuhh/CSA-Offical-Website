-- Create products table for admin to manage products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Public can view all products
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Admin can insert products
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin can update products
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Admin can delete products
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE USING (
    auth.jwt() ->> 'email' = 'csaprintanddesign@gmail.com'
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Insert some sample products (optional - remove if you want to start fresh)
INSERT INTO products (name, description, price, image_url, category, featured) VALUES
  ('Business Cards', 'Professional business cards with premium finish', 25.00, '/assets/products-asset/business-card.jpg', 'business', true),
  ('Custom Stickers', 'High-quality custom stickers in any shape', 15.00, '/assets/products-asset/customized-stickers.jpg', 'stickers', true),
  ('Photocards', 'Premium photocards with glossy finish', 20.00, '/assets/products-asset/photocards.jpg', 'cards', true),
  ('Invitation Cards', 'Beautiful invitation cards for any occasion', 30.00, '/assets/products-asset/Invitation-cards.jpg', 'cards', false),
  ('Custom Pins', 'Enamel pins with custom designs', 18.00, '/assets/products-asset/customized-pins.jpg', 'accessories', false),
  ('Keychains', 'Personalized keychains with your design', 12.00, '/assets/products-asset/Keychains.jpg', 'accessories', false)
ON CONFLICT DO NOTHING;
