import { Injectable } from '@nestjs/common';

import state from '../db/db.module';
import { DBEntyties } from 'src/db/enums';
import { Album } from 'src/album/album.module';
import { Artist } from 'src/artist/artist.module';
import { Track } from 'src/track/track.module';

const favsKey = DBEntyties.favorities;

@Injectable()
export class FavoritesService {
  findAll() {
    return state.getAllByKey(favsKey);
  }

  addOne(entyti: string, item: Artist | Album | Track) {
    return state.addToFavs(entyti, item);
  }

  remove(entyti: string, id: string) {
    return state.deleteFromFavs(entyti, id);
  }
}
