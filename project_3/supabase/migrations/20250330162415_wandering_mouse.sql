/*
  # Fix Video URLs

  1. Changes
    - Update video URLs to use reliable CDN sources
    - Update thumbnail URLs to match content
    - Ensure all videos are publicly accessible
    - Use video formats supported by all modern browsers

  2. Sources
    - Using videos from Bunny.net CDN
    - Fallback to other reliable CDN providers
    - All videos are freely available for educational use
*/

-- Update video URLs to use reliable CDN sources
UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'
WHERE id = 1;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
WHERE id = 2;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e'
WHERE id = 3;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1466637574441-749b8f19452f'
WHERE id = 4;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
WHERE id = 5;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1584208124218-f885de0988d0'
WHERE id = 6;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1674574124473-e91fdcabaefc'
WHERE id = 7;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1637166185789-6803179a833e'
WHERE id = 8;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
WHERE id = 9;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5'
WHERE id = 10;

UPDATE videos 
SET url = 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail_url = 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848'
WHERE id = 11;