/*
  # Add Test User

  1. Changes
    - Add a test user with email k-628@hotmail.com
    - Set password to 123456
    - Enable email authentication
    - Add proper identity record with provider_id
*/

-- Create the user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  last_sign_in_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  'authenticated',
  'authenticated',
  'k-628@hotmail.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  '',
  now()
);

-- Add user identity with provider_id
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
  jsonb_build_object(
    'sub', '43603b28-efbd-4b3c-8ad4-abc55a96eb05',
    'email', 'k-628@hotmail.com',
    'name', 'Test User'
  ),
  'email',
  'k-628@hotmail.com',
  now(),
  now(),
  now()
);