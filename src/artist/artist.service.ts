import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';

import state from '../db/db.module';
import { DBEntyties } from '../db/enums';

import { v4 } from 'uuid';
import { Artist } from './artist.module';

const aristsKey = DBEntyties.artists;

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtists: Artist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    state.addOne(aristsKey, Object.assign({}, newArtists));
    return newArtists;
  }

  findAll() {
    return state.getAllByKey(aristsKey);
  }

  findOne(id: string) {
    return state.getEntityChildById(aristsKey, id);
  }

  update(newInfo) {
    state.change(aristsKey, newInfo);
    return newInfo;
  }

  remove(id: string) {
    const traksKey = DBEntyties.tracks;
    const albumsKey = DBEntyties.albums;
    state.changeInCaseOfDeletion(traksKey, 'artistId', id);
    state.changeInCaseOfDeletion(albumsKey, 'artistId', id);
    state.changeInCaseOfDeletion(albumsKey, 'albumId', id);
    return state.delete(aristsKey, id);
  }
}
