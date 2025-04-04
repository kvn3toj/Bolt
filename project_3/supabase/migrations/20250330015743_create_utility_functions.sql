-- Create utility function for updating timestamps

-- This function is used to automatically update the updated_at column
-- whenever a record is updated
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column IS 'Trigger function to update the updated_at column whenever a record is modified'; 