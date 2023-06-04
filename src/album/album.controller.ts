import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  HttpCode,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return this.albumService.update(Object.assign(album, updateAlbumDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return this.albumService.remove(id);
  }
}
