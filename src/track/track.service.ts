import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';

import state from '../db/db.module';
import { DBEntyties } from '../db/enums';

import { v4 } from 'uuid';
import { Track } from './track.module';

const tracksKey = DBEntyties.tracks;

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: v4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    state.addOne(tracksKey, Object.assign({}, newTrack));
    return newTrack;
  }

  findAll() {
    return state.getAllByKey(tracksKey);
  }

  findOne(id: string) {
    return state.getEntityChildById(tracksKey, id);
  }

  update(newInfo) {
    state.change(tracksKey, newInfo);
    return newInfo;
  }

  remove(id: string) {
    state.deleteFromFavs(tracksKey, id);
    return state.delete(tracksKey, id);
  }
}
