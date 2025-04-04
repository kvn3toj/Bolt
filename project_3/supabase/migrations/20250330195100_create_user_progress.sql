/*
  # Create User Progress Table

  1. New Table
    - `user_progress`
      - Tracks user interaction with video questions
      - Records last interaction timestamp
      - Stores which questions were answered and if correctly
      - Accumulates total points for gamification

  2. Security
    - Enable RLS
    - Users can only access their own data
*/

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  video_id integer REFERENCES videos ON DELETE CASCADE NOT NULL,
  last_question_id uuid REFERENCES video_questions(id) ON DELETE SET NULL,
  last_question_correct boolean DEFAULT false,
  last_interaction timestamptz DEFAULT now(),
  total_points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user progress
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX user_progress_user_id_idx ON user_progress(user_id);
CREATE INDEX user_progress_video_id_idx ON user_progress(video_id); 