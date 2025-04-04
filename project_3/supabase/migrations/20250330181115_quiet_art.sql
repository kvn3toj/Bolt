/*
  # Add Question Type and Binary Questions

  1. Changes
    - Add type column to video_questions table
    - Set default type for existing questions
    - Add new binary questions for interactive learning
    - Update existing question to binary format

  2. Security
    - Maintains existing RLS policies
    - No changes to access control
*/

-- Add type column to video_questions
ALTER TABLE video_questions 
ADD COLUMN type text DEFAULT 'multiple';

-- Update existing questions to binary format where appropriate
UPDATE video_questions 
SET options = ARRAY['Sí', 'No'],
    type = 'binary'
WHERE video_id = 1 
AND timestamp = 120;

-- Add new binary questions
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(1, 450, '¿Te gustaría tener tu propio huerto?', 
ARRAY['Sí', 'No'], 
0,
'binary'),

(2, 300, '¿Has usado redes sociales para marketing?', 
ARRAY['Sí', 'No'],
0,
'binary'),

(3, 180, '¿Tienes un presupuesto mensual?', 
ARRAY['Sí', 'No'],
0,
'binary'),

(4, 240, '¿Cocinas regularmente en casa?', 
ARRAY['Sí', 'No'],
0,
'binary');