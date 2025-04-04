/*
  # Add Sample Educational Videos

  1. New Content
    - Add freely available educational videos from trusted sources
    - Include videos with varying durations and topics
    - Add corresponding questions for interactive learning

  2. Video Sources
    - Using Creative Commons videos from trusted educational platforms
    - All videos are freely available for educational use
*/

-- Insert educational videos
INSERT INTO videos (id, title, description, url, thumbnail_url, duration) VALUES
(9, 'Introducción a la Programación', 
'Aprende los conceptos básicos de la programación y el pensamiento computacional.', 
'https://storage.googleapis.com/webcontainer-io/sample-videos/programming-basics.mp4',
'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
600),

(10, 'Diseño UX/UI Fundamental', 
'Principios básicos del diseño de interfaces y experiencia de usuario.', 
'https://storage.googleapis.com/webcontainer-io/sample-videos/ux-design-basics.mp4',
'https://images.unsplash.com/photo-1561070791-2526d30994b5',
720),

(11, 'Fundamentos de Fotografía Digital', 
'Aprende las bases de la fotografía digital y composición.', 
'https://storage.googleapis.com/webcontainer-io/sample-videos/photography-101.mp4',
'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848',
900);

-- Insert questions for programming video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(9, 120, '¿Qué es un algoritmo?', 
ARRAY[
  'Un tipo de computadora',
  'Una secuencia de pasos para resolver un problema',
  'Un lenguaje de programación',
  'Una base de datos'
],
1),

(9, 300, '¿Cuál es la estructura de control más básica?', 
ARRAY[
  'For loop',
  'While loop',
  'If-else',
  'Switch case'
],
2);

-- Insert questions for UX/UI video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(10, 180, '¿Qué significa UX?', 
ARRAY[
  'User Extension',
  'User Experience',
  'User Exchange',
  'User Expert'
],
1),

(10, 480, '¿Cuál es un principio fundamental del diseño UI?', 
ARRAY[
  'Consistencia',
  'Complejidad',
  'Originalidad',
  'Variedad'
],
0);

-- Insert questions for photography video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(11, 240, '¿Qué es la regla de los tercios?', 
ARRAY[
  'Dividir la foto en 9 partes iguales',
  'Usar solo tres colores',
  'Tomar tres fotos seguidas',
  'Usar tres lentes diferentes'
],
0),

(11, 600, '¿Qué factor afecta la profundidad de campo?', 
ARRAY[
  'La apertura del diafragma',
  'El formato de archivo',
  'La resolución',
  'El balance de blancos'
],
0);