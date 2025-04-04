/*
  # Add Q&A Schema Enhancements

  1. Changes
    - Add additional fields to video_questions table:
      - time_limit: Optional time limit for answering questions (in seconds)
      - points: Optional point value for correct answers
      - pause_on_interaction: Whether video should pause when question appears
      - feedback: JSONB field for correct/incorrect feedback messages
    
    - Create new question_responses table:
      - Stores user responses to video questions
      - Tracks selected options, response time, and correctness
      - Maintains relationships to users, questions, and videos

  2. Security
    - Enable RLS on new table
    - Set appropriate access policies for user data
*/

-- Add additional fields to video_questions table
ALTER TABLE video_questions 
  ADD COLUMN IF NOT EXISTS time_limit INTEGER,
  ADD COLUMN IF NOT EXISTS points INTEGER,
  ADD COLUMN IF NOT EXISTS pause_on_interaction BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS feedback JSONB;

-- Create table for storing user responses to questions
CREATE TABLE IF NOT EXISTS question_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES video_questions ON DELETE CASCADE NOT NULL,
  video_id INTEGER REFERENCES videos ON DELETE CASCADE NOT NULL,
  selected_option INTEGER DEFAULT -1,
  response_time NUMERIC,
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX question_responses_user_id_idx ON question_responses(user_id);
CREATE INDEX question_responses_question_id_idx ON question_responses(question_id);
CREATE INDEX question_responses_video_id_idx ON question_responses(video_id);
CREATE INDEX question_responses_created_at_idx ON question_responses(created_at DESC);

-- Enable Row Level Security
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

-- Allow users to read only their own responses
CREATE POLICY "Users can view their own responses"
  ON question_responses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own responses
CREATE POLICY "Users can insert their own responses"
  ON question_responses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own responses
CREATE POLICY "Users can update their own responses"
  ON question_responses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Comment on table and columns for documentation
COMMENT ON TABLE question_responses IS 'Stores user responses to video questions';
COMMENT ON COLUMN question_responses.id IS 'Primary key for the response';
COMMENT ON COLUMN question_responses.user_id IS 'Foreign key to auth.users';
COMMENT ON COLUMN question_responses.question_id IS 'Foreign key to video_questions';
COMMENT ON COLUMN question_responses.video_id IS 'Foreign key to videos';
COMMENT ON COLUMN question_responses.selected_option IS 'Index of the selected option, -1 means no response';
COMMENT ON COLUMN question_responses.response_time IS 'Time taken to respond in seconds';
COMMENT ON COLUMN question_responses.is_correct IS 'Whether the response was correct';
COMMENT ON COLUMN question_responses.created_at IS 'Timestamp when the response was recorded'; 