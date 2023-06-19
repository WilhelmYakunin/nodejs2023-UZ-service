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
