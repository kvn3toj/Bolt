/*
  # Update Video Schema Types

  1. Changes
    - Change video id from UUID to integer
    - Update related tables to use integer for video_id
    - Maintain all existing relationships and constraints
    - Preserve RLS policies and security settings

  2. Tables Modified
    - videos
    - video_questions
    - video_progress
    - quiz_results

  3. Process
    - Temporarily disable RLS
    - Drop existing foreign key constraints
    - Convert column types
    - Add sequence for video ids
    - Recreate foreign key constraints
    - Re-enable RLS
*/

-- Temporarily disable RLS
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE video_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results DISABLE ROW LEVEL SECURITY;

-- Drop existing foreign key constraints
ALTER TABLE video_questions DROP CONSTRAINT IF EXISTS video_questions_video_id_fkey;
ALTER TABLE video_progress DROP CONSTRAINT IF EXISTS video_progress_video_id_fkey;
ALTER TABLE quiz_results DROP CONSTRAINT IF EXISTS quiz_results_video_id_fkey;

-- Change videos.id to integer
ALTER TABLE videos 
    ALTER COLUMN id DROP DEFAULT,
    ALTER COLUMN id TYPE integer USING id::text::integer;

-- Add sequence for videos.id
CREATE SEQUENCE IF NOT EXISTS videos_id_seq;
SELECT setval('videos_id_seq', COALESCE((SELECT MAX(id) FROM videos), 0) + 1);
ALTER TABLE videos ALTER COLUMN id SET DEFAULT nextval('videos_id_seq');
ALTER SEQUENCE videos_id_seq OWNED BY videos.id;

-- Update video_questions.video_id to integer
ALTER TABLE video_questions
    ALTER COLUMN video_id TYPE integer USING video_id::text::integer;

-- Update video_progress.video_id to integer
ALTER TABLE video_progress
    ALTER COLUMN video_id TYPE integer USING video_id::text::integer;

-- Update quiz_results.video_id to integer
ALTER TABLE quiz_results
    ALTER COLUMN video_id TYPE integer USING video_id::text::integer;

-- Recreate foreign key constraints
ALTER TABLE video_questions
    ADD CONSTRAINT video_questions_video_id_fkey 
    FOREIGN KEY (video_id) 
    REFERENCES videos(id) 
    ON DELETE CASCADE;

ALTER TABLE video_progress
    ADD CONSTRAINT video_progress_video_id_fkey 
    FOREIGN KEY (video_id) 
    REFERENCES videos(id) 
    ON DELETE CASCADE;

ALTER TABLE quiz_results
    ADD CONSTRAINT quiz_results_video_id_fkey 
    FOREIGN KEY (video_id) 
    REFERENCES videos(id) 
    ON DELETE CASCADE;

-- Re-enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;