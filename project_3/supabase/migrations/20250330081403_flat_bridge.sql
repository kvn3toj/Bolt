/*
  # Playlist System Schema

  1. New Tables
    - `playlists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `is_private` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `playlist_videos`
      - `id` (uuid, primary key)
      - `playlist_id` (uuid, references playlists)
      - `video_id` (integer, references videos)
      - `position` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can manage their own playlists
    - Public playlists are visible to everyone
    - Private playlists are only visible to their owners
*/

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create playlist_videos table
CREATE TABLE IF NOT EXISTS playlist_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid REFERENCES playlists ON DELETE CASCADE NOT NULL,
  video_id integer REFERENCES videos ON DELETE CASCADE NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(playlist_id, video_id),
  UNIQUE(playlist_id, position)
);

-- Enable Row Level Security
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_videos ENABLE ROW LEVEL SECURITY;

-- Policies for playlists
CREATE POLICY "Users can manage their playlists"
  ON playlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view non-private playlists"
  ON playlists
  FOR SELECT
  TO public
  USING (NOT is_private);

-- Policies for playlist_videos
CREATE POLICY "Users can manage their playlist videos"
  ON playlist_videos
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_videos.playlist_id
      AND playlists.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_videos.playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view videos in non-private playlists"
  ON playlist_videos
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_videos.playlist_id
      AND NOT playlists.is_private
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_playlists_updated_at
  BEFORE UPDATE ON playlists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();