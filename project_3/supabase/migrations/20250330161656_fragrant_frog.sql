/*
  # Update Video URLs

  1. Changes
    - Update video URLs to use reliable, publicly accessible sources
    - Update thumbnail URLs to match video content
    - Maintain existing video metadata and questions

  2. Sources
    - Using publicly accessible MP4 files from reliable CDNs
    - Using high-quality thumbnails from Unsplash
*/

UPDATE videos 
SET url = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'
WHERE id = 1;

UPDATE videos 
SET url = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
WHERE id = 2;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e'
WHERE id = 3;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1466637574441-749b8f19452f'
WHERE id = 4;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
WHERE id = 5;

UPDATE videos 
SET url = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1584208124218-f885de0988d0'
WHERE id = 6;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1674574124473-e91fdcabaefc'
WHERE id = 7;

UPDATE videos 
SET url = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1637166185789-6803179a833e'
WHERE id = 8;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
WHERE id = 9;

UPDATE videos 
SET url = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5'
WHERE id = 10;

UPDATE videos 
SET url = 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848'
WHERE id = 11;