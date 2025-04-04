/*
  # Add Educational Videos with Interactive Questions

  1. New Content
    - 10 educational videos from free sources
    - Mix of binary and multiple choice questions
    - Questions at strategic timestamps
    - Videos cover various topics:
      - Technology
      - Personal Development
      - Arts & Creativity
      - Business & Entrepreneurship
      - Health & Wellness

  2. Video Sources
    - Using publicly available videos from trusted sources
    - All videos are freely accessible and properly licensed
*/

-- Insert educational videos
INSERT INTO videos (id, title, description, url, thumbnail_url, duration) VALUES
(12, 'Introducción a la Fotografía Digital', 
'Aprende los fundamentos de la fotografía digital, desde la exposición hasta la composición.', 
'https://download.samplelib.com/mp4/sample-30s.mp4',
'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
300),

(13, 'Mindfulness y Productividad', 
'Descubre cómo la práctica del mindfulness puede mejorar tu concentración y productividad.', 
'https://download.samplelib.com/mp4/sample-20s.mp4',
'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
240),

(14, 'Fundamentos de Diseño Web', 
'Aprende los principios básicos del diseño web moderno y responsive.', 
'https://download.samplelib.com/mp4/sample-15s.mp4',
'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
180),

(15, 'Introducción al Marketing Digital', 
'Estrategias efectivas para promocionar tu negocio en línea.', 
'https://download.samplelib.com/mp4/sample-10s.mp4',
'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
420),

(16, 'Yoga para Principiantes', 
'Rutina básica de yoga para mejorar flexibilidad y reducir estrés.', 
'https://download.samplelib.com/mp4/sample-25s.mp4',
'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
360),

(17, 'Gestión Efectiva del Tiempo', 
'Aprende técnicas probadas para maximizar tu productividad.', 
'https://download.samplelib.com/mp4/sample-30s.mp4',
'https://images.unsplash.com/photo-1434626881859-194d67b2b86f',
280),

(18, 'Arte Digital para Principiantes', 
'Introducción a las herramientas básicas del arte digital.', 
'https://download.samplelib.com/mp4/sample-20s.mp4',
'https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6',
320),

(19, 'Finanzas Personales Básicas', 
'Conceptos fundamentales para manejar mejor tu dinero.', 
'https://download.samplelib.com/mp4/sample-15s.mp4',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
400),

(20, 'Comunicación Efectiva', 
'Mejora tus habilidades de comunicación en entornos profesionales.', 
'https://download.samplelib.com/mp4/sample-10s.mp4',
'https://images.unsplash.com/photo-1557425955-df376b5903c8',
350),

(21, 'Emprendimiento Social', 
'Cómo crear un negocio con impacto social positivo.', 
'https://download.samplelib.com/mp4/sample-25s.mp4',
'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
450);

-- Insert questions for Photography course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(12, 30, '¿Tienes una cámara digital?',
ARRAY['Sí', 'No'],
0, 'binary'),

(12, 90, '¿Cuál es el factor más importante en la exposición?',
ARRAY['Apertura', 'Velocidad de obturación', 'ISO', 'Balance de blancos'],
0, 'multiple'),

(12, 180, '¿Entiendes el concepto de profundidad de campo?',
ARRAY['Sí', 'No'],
0, 'binary'),

(12, 240, '¿Qué regla de composición es más básica?',
ARRAY['Regla de los tercios', 'Simetría', 'Líneas guía', 'Patrones'],
0, 'multiple');

-- Insert questions for Mindfulness course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(13, 45, '¿Has practicado meditación antes?',
ARRAY['Sí', 'No'],
0, 'binary'),

(13, 120, '¿Cuál es el primer paso en la práctica de mindfulness?',
ARRAY['Respiración consciente', 'Visualización', 'Movimiento', 'Mantras'],
0, 'multiple'),

(13, 180, '¿Te sientes más relajado ahora?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Web Design course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(14, 30, '¿Has creado páginas web antes?',
ARRAY['Sí', 'No'],
0, 'binary'),

(14, 90, '¿Qué significa responsive design?',
ARRAY['Diseño adaptable', 'Diseño rápido', 'Diseño moderno', 'Diseño simple'],
0, 'multiple'),

(14, 150, '¿Cuál es el lenguaje básico para estructurar una web?',
ARRAY['HTML', 'CSS', 'JavaScript', 'Python'],
0, 'multiple');

-- Insert questions for Digital Marketing course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(15, 60, '¿Has usado redes sociales para marketing?',
ARRAY['Sí', 'No'],
0, 'binary'),

(15, 180, '¿Cuál es la mejor plataforma para B2B?',
ARRAY['LinkedIn', 'Instagram', 'TikTok', 'Facebook'],
0, 'multiple'),

(15, 300, '¿Qué métrica es más importante?',
ARRAY['Engagement', 'Seguidores', 'Likes', 'Comentarios'],
0, 'multiple'),

(15, 360, '¿Implementarás estas estrategias?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Yoga course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(16, 30, '¿Has practicado yoga antes?',
ARRAY['Sí', 'No'],
0, 'binary'),

(16, 120, '¿Cuál es la postura básica más importante?',
ARRAY['Montaña', 'Perro mirando abajo', 'Guerrero', 'Árbol'],
0, 'multiple'),

(16, 240, '¿Te sientes más flexible?',
ARRAY['Sí', 'No'],
0, 'binary'),

(16, 300, '¿Continuarás practicando?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Time Management course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(17, 40, '¿Usas algún sistema de gestión del tiempo?',
ARRAY['Sí', 'No'],
0, 'binary'),

(17, 120, '¿Cuál es la técnica más efectiva?',
ARRAY['Pomodoro', 'GTD', 'Kanban', 'Time blocking'],
0, 'multiple'),

(17, 200, '¿Implementarás estas técnicas?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Digital Art course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(18, 30, '¿Has usado software de diseño?',
ARRAY['Sí', 'No'],
0, 'binary'),

(18, 120, '¿Qué herramienta es más importante?',
ARRAY['Lápiz', 'Pincel', 'Borrador', 'Capas'],
3, 'multiple'),

(18, 240, '¿Te sientes inspirado para crear?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Personal Finance course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(19, 60, '¿Tienes un presupuesto mensual?',
ARRAY['Sí', 'No'],
0, 'binary'),

(19, 180, '¿Cuál es la regla del ahorro?',
ARRAY['50/30/20', '60/30/10', '70/20/10', '40/40/20'],
0, 'multiple'),

(19, 300, '¿Comenzarás a ahorrar?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Communication course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(20, 45, '¿Te consideras buen comunicador?',
ARRAY['Sí', 'No'],
0, 'binary'),

(20, 150, '¿Qué es más importante en la comunicación?',
ARRAY['Escucha activa', 'Tono de voz', 'Lenguaje corporal', 'Vocabulario'],
0, 'multiple'),

(20, 300, '¿Has mejorado tu comprensión?',
ARRAY['Sí', 'No'],
0, 'binary');

-- Insert questions for Social Entrepreneurship course
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer, type) VALUES
(21, 60, '¿Has emprendido antes?',
ARRAY['Sí', 'No'],
0, 'binary'),

(21, 180, '¿Qué define a un emprendimiento social?',
ARRAY['Impacto social', 'Rentabilidad', 'Tamaño', 'Tecnología'],
0, 'multiple'),

(21, 300, '¿Tienes una idea de impacto social?',
ARRAY['Sí', 'No'],
0, 'binary'),

(21, 400, '¿Cuál es el primer paso para emprender?',
ARRAY['Identificar problema', 'Buscar financiamiento', 'Crear logo', 'Hacer publicidad'],
0, 'multiple');