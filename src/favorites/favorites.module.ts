import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Artist } from 'src/artist/artist.module';
import { Album } from 'src/album/album.module';
import { Track } from 'src/track/track.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

export interface Favorites {
  artists: Artist[] | [];
  albums: Album[] | [];
  tracks: Track[] | [];
}
