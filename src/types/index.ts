export interface Artist {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  quote?: string;
  genres: string[];
  stats: {
    singles?: number;
    albums?: number;
    collaborations?: number;
  };
  tracks?: Track[];
  spoiler?: {
    videoFile: string;
    description: string;
    locked?: boolean;
  };
  socialLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover?: string;
  audioFile?: string;
  description?: string;
}

export interface Spoiler {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  videoFile: string;
  description?: string;
  locked?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Page = 'home' | 'artists' | 'artist-detail' | 'spoiler' | 'contacts';
