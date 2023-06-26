import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { PrismaModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NodeModule {
  isPreloading: boolean;
  exports: any;
  require: NodeJS.Require;
  id: string;
  filename: string;
  loaded: boolean;
  parent: NodeJS.Module;
  children: NodeJS.Module[];
  path: string;
  paths: string[];
}
