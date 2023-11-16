export interface User {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface Photo {
  id: number;
  url: string;
  albumId: number;
}
