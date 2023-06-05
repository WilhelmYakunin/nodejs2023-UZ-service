import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}
