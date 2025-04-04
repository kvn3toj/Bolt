/*
  # Update Video Sources

  1. Changes
    - Update video URLs to use publicly available videos from Pexels
    - Update thumbnail URLs to match video content
    - Keep existing video metadata and questions
*/

-- Update video URLs to use publicly available videos
UPDATE videos 
SET url = 'https://player.vimeo.com/external/189545487.sd.mp4?s=8cd2af1ec08f7ce121a5a6a09c78c05237943524&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
WHERE id = 1;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/403295268.sd.mp4?s=3446f36ca57399c75b75304d7a53444c5e730239&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg'
WHERE id = 2;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27595335c9397a18b8883ca35a1c25dab153a1a&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
WHERE id = 3;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/371843631.sd.mp4?s=c09321094c5e3a8a7c7c2cdf36560ef3d648cb1b&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
WHERE id = 4;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/496797983.sd.mp4?s=d57fb3f7f65b5c2796d6d0cd9fe3cc4f67e46667&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
WHERE id = 5;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/517090081.sd.mp4?s=2ec32ea27c46efc97a73646dd2f566c37a66723c&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg'
WHERE id = 6;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/478293826.sd.mp4?s=4a9d27c9b5d421a74bfa1dca9ab4f6e3b0bee345&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/7014946/pexels-photo-7014946.jpeg'
WHERE id = 7;

UPDATE videos 
SET url = 'https://player.vimeo.com/external/459389137.sd.mp4?s=902b20fc195d86eb4e5f2584b3474ea8f8d2ec88&profile_id=164&oauth2_token_id=57447761',
    thumbnail_url = 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg'
WHERE id = 8;