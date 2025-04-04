/*
  # Add AI-Generated Educational Videos

  1. New Content
    - Add AI-generated educational videos with:
      - Realistic URLs from cloud storage
      - Appropriate thumbnails
      - Varied durations
      - Interactive questions
    
  2. Categories
    - Technology tutorials
    - Business skills
    - Personal development
    - Creative arts
*/

-- Insert AI-generated educational videos
INSERT INTO videos (id, title, description, url, thumbnail_url, duration) VALUES
(5, 'Fundamentos de Inteligencia Artificial', 
'Una introducción práctica a la IA y su impacto en la tecnología moderna.', 
'https://storage.googleapis.com/ai-edu-content/ai-fundamentals-v1.mp4',
'https://images.unsplash.com/photo-1677442136019-21780ecad995',
1200),

(6, 'Desarrollo Personal: Gestión del Tiempo', 
'Técnicas efectivas para maximizar tu productividad y alcanzar tus metas.', 
'https://storage.googleapis.com/ai-edu-content/time-management-v1.mp4',
'https://images.unsplash.com/photo-1584208124218-f885de0988d0',
900),

(7, 'Arte Digital para Principiantes', 
'Aprende las bases del arte digital y crea tus primeras obras.', 
'https://storage.googleapis.com/ai-edu-content/digital-art-basics-v1.mp4',
'https://images.unsplash.com/photo-1674574124473-e91fdcabaefc',
1500),

(8, 'Emprendimiento Social', 
'Cómo crear un negocio que genere impacto positivo en la sociedad.', 
'https://storage.googleapis.com/ai-edu-content/social-entrepreneurship-v1.mp4',
'https://images.unsplash.com/photo-1637166185789-6803179a833e',
1800);

-- Insert interactive questions for AI Fundamentals
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(5, 180, '¿Cuál es la diferencia principal entre IA débil y fuerte?', 
ARRAY[
  'La cantidad de datos que procesan',
  'La velocidad de procesamiento',
  'El nivel de consciencia y comprensión',
  'El costo de implementación'
],
2),

(5, 600, '¿Qué tipo de aprendizaje automático se usa en el reconocimiento de imágenes?', 
ARRAY[
  'Aprendizaje supervisado',
  'Aprendizaje por refuerzo',
  'Aprendizaje no supervisado',
  'Redes neuronales convolucionales'
],
3),

(5, 900, '¿Cuál es una aplicación práctica del procesamiento del lenguaje natural?', 
ARRAY[
  'Asistentes virtuales',
  'Reconocimiento facial',
  'Conducción autónoma',
  'Análisis de mercado'
],
0);

-- Insert questions for Time Management
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(6, 240, '¿Cuál es el principio fundamental de la matriz de Eisenhower?', 
ARRAY[
  'Priorizar por fecha límite',
  'Clasificar tareas por importancia y urgencia',
  'Organizar por dificultad',
  'Dividir el tiempo en bloques'
],
1),

(6, 480, '¿Qué técnica se recomienda para mantener el enfoque?', 
ARRAY[
  'Multitarea constante',
  'Técnica Pomodoro',
  'Trabajar sin descansos',
  'Extender las horas de trabajo'
],
1),

(6, 720, '¿Cuál es el mejor momento para planificar el día?', 
ARRAY[
  'Durante el desayuno',
  'La noche anterior',
  'Primera hora de la mañana',
  'Durante el almuerzo'
],
1);

-- Insert questions for Digital Art
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(7, 300, '¿Qué herramienta es esencial para el arte digital?', 
ARRAY[
  'Tableta gráfica',
  'Impresora 3D',
  'Scanner',
  'Cámara DSLR'
],
0),

(7, 900, '¿Qué formato es mejor para guardar arte digital con transparencia?', 
ARRAY[
  'JPG',
  'PNG',
  'BMP',
  'TIFF'
],
1),

(7, 1200, '¿Cuál es la resolución recomendada para arte digital web?', 
ARRAY[
  '72 DPI',
  '150 DPI',
  '300 DPI',
  '600 DPI'
],
0);

-- Insert questions for Social Entrepreneurship
INSERT INTO video_questions (video_id, timestamp, question, options, correct_answer) VALUES
(8, 360, '¿Qué caracteriza a un emprendimiento social?', 
ARRAY[
  'Maximizar ganancias',
  'Impacto social positivo',
  'Minimizar costos',
  'Rápido crecimiento'
],
1),

(8, 900, '¿Cuál es el primer paso para validar una idea de emprendimiento social?', 
ARRAY[
  'Buscar financiamiento',
  'Crear un plan de negocios',
  'Identificar el problema social',
  'Registrar la empresa'
],
2),

(8, 1500, '¿Cómo se mide el éxito en un emprendimiento social?', 
ARRAY[
  'Solo por ingresos',
  'Por el retorno de inversión',
  'Por métricas de impacto social',
  'Por el número de empleados'
],
2);