import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  Delete,
  Put,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return this.artistService.update(Object.assign(artist, updateArtistDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const user = this.artistService.findOne(id);
    if (!user) throw new NotFoundException();
    return this.artistService.remove(id);
  }
}
