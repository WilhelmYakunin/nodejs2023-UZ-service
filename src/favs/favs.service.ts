import { Injectable } from '@nestjs/common';

import state from '../db/db.module';
import { DBEntyties } from '../db/enums';
import { Album } from '../album/album.module';
import { Artist } from '../artist/artist.module';
import { Track } from '../track/track.module';

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
