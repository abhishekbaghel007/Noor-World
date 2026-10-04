// ─── Contribution Types ───
export const CONTRIBUTION_TYPES = [
  "hug", "flower", "note", "coffee", "chocolate", "teddy", "sparkle",
  "highfive", "joke", "song", "escape"
] as const;
export type ContributionType = typeof CONTRIBUTION_TYPES[number];

export const MOODS = [
  "just-because", "happy", "laugh", "hug", "difficult", "no-reason"
] as const;
export type Mood = typeof MOODS[number];

export const FLOWERS = [
  "🌻", "🌷", "🌹", "🌸", "🌼", "🪻", "🌺"
] as const;
export const WRAPPINGS = [
  "🎀", "🤍", "💗", "💛", "🩷"
] as const;

export interface Contribution {
  id: string;
  type: ContributionType;
  sender_name: string;
  content: string;
  mood: Mood;
  meta: Record<string, unknown>;
  is_read: boolean;
  is_favorite: boolean;
  is_hidden: boolean;
  created_at: string;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  active: boolean;
  created_at: string;
}

export interface PollVote {
  id: string;
  poll_id: string;
  voter_name: string;
  option_index: number;
  created_at: string;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  nominee: string;
  votes: number;
  created_at: string;
}

export interface Memory {
  id: string;
  title: string;
  body: string;
  emoji: string;
  author: string;
  date: string;
  image_url?: string;
  tags: string[];
  created_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  recommended_by: string;
  note: string;
  created_at: string;
}

export type OpenWhenCategory =
  | "sad" | "good-day" | "hug" | "annoying" | "cant-sleep" | "nice" | "birthday" | "surprise";

export interface OpenWhenCard {
  id: string;
  category: OpenWhenCategory;
  title: string;
  body: string;
  emoji: string;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  question_id: string;
  chosen_index: number;
  correct: boolean;
  created_at: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar_url?: string;
  contribution_count: number;
  favorite_contribution_id?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  message: string;
  contribution_id?: string;
  read: boolean;
  created_at: string;
}

export interface GardenItem {
  id: string;
  contribution_id: string;
  type: ContributionType;
  position_x: number;
  position_y: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  active: boolean;
  created_at: string;
}

export interface Settings {
  id: boolean;
  submissions_open: boolean;
  allow_anonymous: boolean;
  updated_at: string;
}


export interface GameScore {
  game: string;
  score: number;
  bestScore: number;
  playedAt: string;
}
