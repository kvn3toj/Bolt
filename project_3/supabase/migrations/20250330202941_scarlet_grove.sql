/*
  # Add Sample Products

  1. New Content
    - Add sample products with realistic data
    - Include images from Unsplash
    - Add varied categories and prices
    - Set seller IDs to match existing users

  2. Data Structure
    - Products table with all required fields
    - Images from reliable sources
    - Realistic pricing and descriptions
*/

-- Insert sample products
INSERT INTO products (id, seller_id, name, description, price, stock, category, images) VALUES
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Smartwatch Pro X',
  'Último modelo con monitor cardíaco y seguimiento de actividad física. Incluye pantalla AMOLED, resistencia al agua y batería de larga duración.',
  299.99,
  50,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1546868871-7041f2a55e12']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Cámara DSLR 4K',
  'Perfecta para fotografía profesional. Sensor de última generación, grabación 4K y conectividad WiFi.',
  899.99,
  25,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Zapatillas Running Pro',
  'Máxima comodidad para corredores. Tecnología de amortiguación avanzada y diseño transpirable.',
  129.99,
  100,
  'sports',
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Laptop Ultradelgada',
  'Potente laptop con procesador de última generación, pantalla 4K y diseño premium.',
  1299.99,
  30,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Mochila Deportiva',
  'Espaciosa y resistente, perfecta para gimnasio o viajes cortos. Material impermeable.',
  49.99,
  200,
  'sports',
  ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Auriculares Inalámbricos',
  'Cancelación de ruido activa, batería de larga duración y sonido premium.',
  199.99,
  75,
  'electronics',
  ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Vestido Elegante',
  'Diseño moderno y elegante, perfecto para ocasiones especiales. Tela de alta calidad.',
  89.99,
  40,
  'fashion',
  ARRAY['https://images.unsplash.com/photo-1539008835657-9e8e9680c956']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Lámpara de Diseño',
  'Lámpara moderna con control de intensidad y temperatura de color. Perfecta para cualquier espacio.',
  79.99,
  60,
  'home',
  ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Set de Yoga',
  'Kit completo con mat, bloques y correa. Material ecológico y antideslizante.',
  59.99,
  150,
  'sports',
  ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b']
),
(
  gen_random_uuid(),
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'Reloj de Pared Moderno',
  'Diseño minimalista con movimiento silencioso. Perfecto para oficina o sala de estar.',
  39.99,
  100,
  'home',
  ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c']
);