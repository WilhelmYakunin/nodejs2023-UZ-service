import { Injectable } from '@nestjs/common';

import state from '../db/db.module';
import { DBEntyties } from 'src/db/enums';

const favsKey = DBEntyties.favorities;

@Injectable()
export class FavoritesService {
  findAll() {
    return state.getAllByKey[favsKey];
  }

  findOne(entyti: string, id: number) {
    return state.addToFavs(entyti, id);
  }

  remove(entyti: string, id: number) {
    return state.deleteFromFavs(entyti, id);
  }
}
