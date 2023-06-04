import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { Album } from './entities/album.entity';
import { v4 } from 'uuid';

import state from '../db/db.module';
import { DBEntyties } from 'src/db/enums';

const albumsKey = DBEntyties.albums;

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
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
    const tracksKey = DBEntyties.tracks;
    state.changeInCaseOfDeletion(tracksKey, 'albumId', id);
    return state.delete(albumsKey, id);
  }
}
