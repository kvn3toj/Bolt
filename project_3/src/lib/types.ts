export interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface VideoQuestion {
  id: string;
  video_id: number;
  timestamp: number;
  question: string;
  options: string[];
  correct_answer: number;
  type: 'paused' | 'binary';
  time_limit?: number;
  points?: number;
  pause_on_interaction?: boolean;
  created_at: string;
  feedback?: {
    correct?: string;
    incorrect?: string;
  };
}

export interface VideoProgress {
  id: string;
  user_id: string;
  video_id: number;
  progress: number;
  watch_time: number;
  last_watched_at: string;
  video: {
    title: string;
  };
}

export interface QuizResult {
  id: string;
  user_id: string;
  video_id: number;
  question_id: string;
  score: number;
  total_questions: number;
  created_at: string;
}

export interface AnalyticsData {
  totalWatchTime: number;
  videosWatched: number;
  averageScore: number;
  completionRate: number;
  recentProgress: VideoProgress[];
}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  videos?: {
    id: string;
    video_id: number;
    position: number;
    video: Video;
  }[];
}

export type UserRole = 'consumer' | 'provider';