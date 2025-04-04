/*
  # Save Project Version - Interactive Video Platform

  This migration serves as a checkpoint for the current state of the project,
  which includes:

  1. Core Features
    - Video player with custom controls
    - Interactive questions (binary and multiple choice)
    - Progress tracking
    - Quiz results
    - User engagement metrics

  2. Data Structure
    - All necessary tables and relationships
    - Security policies and permissions
    - Indexes for performance
    - Sample content for testing

  3. Current State
    - Functional video player
    - Question system working
    - User progress tracking
    - Analytics implementation
*/

-- Verify all required tables exist
DO $$
BEGIN
    -- Core tables
    ASSERT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'videos'
    ), 'Videos table not found';

    ASSERT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'video_questions'
    ), 'Video questions table not found';

    ASSERT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'video_progress'
    ), 'Video progress table not found';

    ASSERT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'quiz_results'
    ), 'Quiz results table not found';

    -- Verify column types
    ASSERT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'video_questions'
        AND column_name = 'type'
        AND data_type = 'text'
    ), 'Question type column not found';

    -- Verify RLS is enabled
    ASSERT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'videos'
        AND rowsecurity = true
    ), 'RLS not enabled on videos table';

    -- Verify indexes exist
    ASSERT EXISTS (
        SELECT FROM pg_indexes
        WHERE schemaname = 'public'
        AND tablename = 'video_progress'
        AND indexname = 'video_progress_user_id_idx'
    ), 'Video progress index not found';

END $$;

-- Add version metadata
COMMENT ON TABLE videos IS 'Version 1.0.0 - Interactive Video Platform';
COMMENT ON TABLE video_questions IS 'Version 1.0.0 - Interactive Questions System';
COMMENT ON TABLE video_progress IS 'Version 1.0.0 - User Progress Tracking';
COMMENT ON TABLE quiz_results IS 'Version 1.0.0 - Quiz Performance Analytics';

-- Version checkpoint complete
SELECT NOW() as checkpoint_time;