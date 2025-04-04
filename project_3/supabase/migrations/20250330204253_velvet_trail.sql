/*
  # Marketplace Schema Update

  1. Changes
    - Add location field to products table
    - Add rating field to products table
    - Add reviews_count field to products table
    - Add seller_name field to products table
    - Add seller_avatar field to products table
    - Add featured field to products table
    - Add sample products matching the design

  2. Security
    - Maintain existing RLS policies
    - Keep all constraints
*/

-- Add new columns to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN IF NOT EXISTS reviews_count integer DEFAULT 0 CHECK (reviews_count >= 0),
ADD COLUMN IF NOT EXISTS seller_name text,
ADD COLUMN IF NOT EXISTS seller_avatar text,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Insert sample products matching the design
INSERT INTO products (
  id, seller_id, name, description, price, stock, category, 
  images, location, rating, reviews_count, seller_name, seller_avatar,
  featured
) VALUES
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'iPhone 14 Pro Max',
  'Nuevo iPhone 14 Pro Max, 256GB, color Space Black',
  1299.99,
  50,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1678652197831-2d180705cd2c'],
  'Miami, FL',
  4.8,
  156,
  'Apple Store',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
  true
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'MacBook Pro 16"',
  'MacBook Pro con chip M2 Pro, 32GB RAM, 1TB SSD',
  2499.99,
  25,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca4'],
  'New York, NY',
  4.9,
  234,
  'Mac World',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
  true
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'AirPods Pro 2',
  'AirPods Pro de segunda generación con cancelación de ruido',
  249.99,
  100,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434'],
  'Los Angeles, CA',
  4.7,
  89,
  'Audio Store',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
  true
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'iPad Pro 12.9"',
  'iPad Pro con chip M2, 256GB, WiFi + Cellular',
  1099.99,
  30,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0'],
  'Chicago, IL',
  4.8,
  167,
  'iWorld',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
  false
);