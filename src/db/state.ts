import { User } from 'src/user/user.module';

interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface Favorites {
  artists: Artist[] | [];
  albums: Album[] | [];
  tracks: Track[] | [];
}

interface AppState {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorities: Favorites;
}

const defaultState: AppState = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorities: {
    artists: [],
    tracks: [],
    albums: [],
  },
};

export default defaultState;
