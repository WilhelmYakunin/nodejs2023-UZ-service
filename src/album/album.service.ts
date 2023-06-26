import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';

import state from '../db/db.module';
import { DBEntyties } from '../db/enums';

import { v4 } from 'uuid';
import { Album } from './album.module';

const albumsKey = DBEntyties.albums;

@Injectable()
export class AlbumService {
  create(CreateAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: v4(),
      name: CreateAlbumDto.name,
      year: CreateAlbumDto.year,
      artistId: CreateAlbumDto.artistId,
    };
    state.addOne(albumsKey, Object.assign({}, newAlbum));
    return newAlbum;
  }

  findAll() {
    return state.getAllByKey(albumsKey);
  }

  findOne(id: string) {
    return state.getEntityChildById(albumsKey, id);
  }

  update(newInfo) {
    state.change(albumsKey, newInfo);
    return newInfo;
  }

  remove(id: string) {
    const traksKey = DBEntyties.tracks;
    state.changeInCaseOfDeletion(traksKey, 'albumId', id);
    state.deleteFromFavs(albumsKey, id);
    return state.delete(albumsKey, id);
  }
}
