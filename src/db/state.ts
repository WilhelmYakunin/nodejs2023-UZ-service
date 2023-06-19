import { User } from 'src/user/user.module';
import { Artist } from 'src/artist/artist.module';
import { Track } from 'src/track/track.module';
import { Album } from 'src/album/album.module';

// interface AppState {
//   users: User[];
//   artists: Artist[];
//   tracks: Track[];
//   albums: Album[];
//   favorities: {
//     artists: Artist[];
//     tracks: Track[];
//     albums: Album[];
//   };
// }

const defaultState: any = {
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
