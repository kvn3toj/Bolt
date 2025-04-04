/*
  # Add Sample Video Questions

  1. New Content
    - Add realistic questions that appear throughout videos
    - Include both binary (Yes/No) and multiple choice questions
    - Add questions at strategic timestamps
    - Questions are designed to be engaging and relevant to content

  2. Question Types
    - Binary questions for quick engagement
    - Multiple choice for deeper learning
    - Questions appear at natural breaks in content
*/

-- Add engaging questions for sustainable farming video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
-- Early engagement questions
(1, 30, '¿Has cultivado plantas antes?',
ARRAY['Sí', 'No'],
0, 'binary'),

(1, 90, '¿Tienes espacio para un huerto en casa?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Content checkpoints
(1, 180, '¿Cuál es el primer paso para preparar la tierra?',
ARRAY['Regar abundantemente', 'Remover y airear', 'Añadir fertilizante', 'Plantar directamente'],
1, 'multiple'),

(1, 300, '¿Te sientes preparado para empezar tu huerto?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Knowledge validation
(1, 450, '¿Qué cultivo es más adecuado para principiantes?',
ARRAY['Tomates', 'Lechugas', 'Zanahorias', 'Papas'],
1, 'multiple');

-- Add interactive questions for digital marketing video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
-- Initial assessment
(2, 45, '¿Has hecho marketing en redes sociales?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Engagement checkpoints
(2, 120, '¿Cuál es la red social más efectiva para B2B?',
ARRAY['Instagram', 'TikTok', 'LinkedIn', 'Facebook'],
2, 'multiple'),

(2, 240, '¿Te interesa el marketing de contenidos?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Knowledge checks
(2, 360, '¿Qué métrica es más importante para engagement?',
ARRAY['Likes', 'Comentarios', 'Compartidos', 'Tiempo de visualización'],
3, 'multiple'),

(2, 480, '¿Estás listo para crear tu estrategia?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Add questions for personal finance video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
-- Initial engagement
(3, 60, '¿Llevas un registro de tus gastos?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Learning checkpoints
(3, 180, '¿Cuál es la regla básica del ahorro?',
ARRAY['50/30/20', '70/20/10', '60/30/10', '40/40/20'],
0, 'multiple'),

(3, 300, '¿Has establecido metas financieras?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Advanced concepts
(3, 420, '¿Qué inversión es más segura a largo plazo?',
ARRAY['Criptomonedas', 'Fondos indexados', 'Forex', 'Préstamos P2P'],
1, 'multiple'),

(3, 540, '¿Planeas crear un fondo de emergencia?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Add questions for healthy cooking video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
-- Initial assessment
(4, 30, '¿Cocinas regularmente en casa?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Technique validation
(4, 150, '¿Cuál es la mejor técnica para cortar verduras?',
ARRAY['Juliana', 'Brunoise', 'Macedonia', 'Chiffonade'],
1, 'multiple'),

-- Engagement check
(4, 300, '¿Te animas a probar estas recetas?',
ARRAY['Sí', 'No'],
0, 'binary'),

-- Knowledge application
(4, 450, '¿Qué método de cocción conserva más nutrientes?',
ARRAY['Freír', 'Hervir', 'Al vapor', 'A la plancha'],
2, 'multiple'),

(4, 600, '¿Implementarás estos consejos en tu cocina?',
ARRAY['Sí', 'No'],
0, 'binary');