import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favs.service';

import db from '../db/db.module';
import { Artist } from '../artist/artist.module';
import { Album } from '../album/album.module';
import { Track } from '../track/track.module';

enum FavsEntyties {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':entyti/:id')
  @HttpCode(201)
  create(
    @Param(
      'entyti',
      new ParseEnumPipe(FavsEntyties, { errorHttpStatusCode: 422 }),
    )
    entyti: string,
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const normalizedEntytikey = entyti + 's';
    const item: Artist | Album | Track = db.getEntityChildById(
      normalizedEntytikey,
      id,
    );
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesService.addOne(normalizedEntytikey, item);
  }

  @Delete(':entyti/:id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Param(
      'entyti',
      new ParseEnumPipe(FavsEntyties, { errorHttpStatusCode: 422 }),
    )
    entyti: string,
  ) {
    const normalizedEntytikey = entyti + 's';
    const all = this.favoritesService.findAll();
    const item: Artist | Album | Track = all[normalizedEntytikey].find(
      (included) => included.id === id,
    );
    if (!item) throw new NotFoundException();
    return this.favoritesService.remove(normalizedEntytikey, id);
  }
}
