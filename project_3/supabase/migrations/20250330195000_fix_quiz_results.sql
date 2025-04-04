/*
  # Update Quiz Results Schema

  1. Changes
    - Add missing columns to quiz_results table:
      - question_id (uuid references video_questions.id)
      - is_correct (boolean to track if answer was correct)
      - points_earned (integer for gamification)
      - timestamp (timestamptz for when quiz was answered)

  2. Backward Compatibility
    - Preserves existing score and total_questions columns
    - Updates column types to match application needs
*/

-- Add missing columns to quiz_results table
ALTER TABLE quiz_results 
  ADD COLUMN IF NOT EXISTS question_id uuid REFERENCES video_questions(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_correct boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS points_earned integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS timestamp timestamptz DEFAULT now();

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS quiz_results_question_id_idx ON quiz_results(question_id); 