import { Module } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { FavoritesController } from './favs.controller';
import { Artist } from '../artist/artist.module';
import { Album } from '../album/album.module';
import { Track } from '../track/track.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavsModule {}

export interface Favorites {
  artists: Artist[] | [];
  albums: Album[] | [];
  tracks: Track[] | [];
}
