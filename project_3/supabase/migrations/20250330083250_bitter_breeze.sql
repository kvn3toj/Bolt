/*
  # Add Sample Videos and Questions

  1. New Content
    - Add sample videos for testing and development
    - Add corresponding quiz questions
    - Videos include educational content about:
      - Sustainable farming
      - Digital marketing
      - Personal finance
      - Healthy cooking

  2. Data Structure
    - Videos with titles, descriptions, URLs, and durations
    - Questions at specific timestamps
    - Multiple choice options and correct answers
*/

-- Insert sample videos
INSERT INTO videos (id, title, description, url, thumbnail_url, duration) VALUES
(1, 'Introducción a la Agricultura Sostenible', 
'Aprende los fundamentos de la agricultura sostenible y cómo puedes comenzar tu propio huerto urbano.', 
'https://storage.googleapis.com/webcontainer-assets/sustainable-farming.mp4',
'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
900),

(2, 'Marketing Digital para Emprendedores', 
'Estrategias efectivas de marketing digital para hacer crecer tu negocio en línea.', 
'https://storage.googleapis.com/webcontainer-assets/digital-marketing.mp4',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
1200),

(3, 'Finanzas Personales: Primeros Pasos', 
'Aprende a manejar tu dinero de manera inteligente y construir un futuro financiero sólido.', 
'https://storage.googleapis.com/webcontainer-assets/personal-finance.mp4',
'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
1500),

(4, 'Cocina Saludable y Económica', 
'Recetas nutritivas y económicas para una alimentación saludable.', 
'https://storage.googleapis.com/webcontainer-assets/healthy-cooking.mp4',
'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
1800);

-- Insert sample questions for sustainable farming video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(1, 120, '¿Cuál es el primer paso para iniciar un huerto urbano?', 
ARRAY['Comprar todas las herramientas', 'Analizar el espacio disponible', 'Plantar inmediatamente', 'Comprar fertilizantes químicos'],
1),

(1, 300, '¿Qué método de riego es más eficiente para un huerto urbano?', 
ARRAY['Riego por aspersión', 'Riego por goteo', 'Riego manual diario', 'Riego por inundación'],
1),

(1, 600, '¿Cuál es la mejor temporada para plantar tomates?', 
ARRAY['Invierno', 'Primavera', 'Verano', 'Otoño'],
1);

-- Insert sample questions for digital marketing video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(2, 180, '¿Cuál es el primer paso en una estrategia de marketing digital?', 
ARRAY['Crear redes sociales', 'Definir el público objetivo', 'Diseñar el logo', 'Hacer publicidad pagada'],
1),

(2, 480, '¿Qué métrica es más importante para medir el éxito en redes sociales?', 
ARRAY['Número de seguidores', 'Engagement', 'Número de posts', 'Número de likes'],
1),

(2, 900, '¿Cuál es la mejor hora para publicar en redes sociales?', 
ARRAY['Temprano en la mañana', 'Durante el almuerzo', 'En la noche', 'Depende de tu audiencia'],
3);

-- Insert sample questions for personal finance video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(3, 240, '¿Cuál es el primer paso para crear un presupuesto?', 
ARRAY['Reducir gastos', 'Registrar ingresos y gastos', 'Abrir una cuenta de ahorros', 'Invertir en bolsa'],
1),

(3, 600, '¿Qué porcentaje de ingresos se recomienda ahorrar mensualmente?', 
ARRAY['5%', '10%', '20%', 'Depende de tus objetivos'],
3),

(3, 1200, '¿Cuál es la mejor manera de comenzar a invertir?', 
ARRAY['Criptomonedas', 'Fondos indexados', 'Acciones individuales', 'Préstamos P2P'],
1);

-- Insert sample questions for healthy cooking video
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(4, 300, '¿Cuál es la mejor técnica de cocción para conservar nutrientes?', 
ARRAY['Freír', 'Hervir', 'Al vapor', 'A la plancha'],
2),

(4, 900, '¿Qué alimento es una buena fuente de proteína vegetal?', 
ARRAY['Arroz', 'Lentejas', 'Papa', 'Zanahoria'],
1),

(4, 1500, '¿Cuál es la proporción ideal de un plato saludable?', 
ARRAY['50% proteínas, 25% carbohidratos, 25% vegetales', 
'25% proteínas, 25% carbohidratos, 50% vegetales', 
'33% de cada uno', 
'75% proteínas, 25% vegetales'],
1);