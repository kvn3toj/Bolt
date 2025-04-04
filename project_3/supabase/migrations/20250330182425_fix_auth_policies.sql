/*
  # Fix Authentication Policies

  1. Changes
    - Update auth policies to allow user registration
    - Fix user access permissions
    - Ensure proper role assignments
*/

-- Update auth.users policies
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own data
CREATE POLICY "Users can view their own data"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data"
  ON auth.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow public registration
CREATE POLICY "Public can register"
  ON auth.users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Update auth.identities policies
ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own identities
CREATE POLICY "Users can view their own identities"
  ON auth.identities
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow public to create identities during registration
CREATE POLICY "Public can create identities"
  ON auth.identities
  FOR INSERT
  TO anon
  WITH CHECK (true); 