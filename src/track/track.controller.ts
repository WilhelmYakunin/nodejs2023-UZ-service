import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return this.trackService.update(Object.assign(track, updateTrackDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 400 }))
    id: string,
  ) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return this.trackService.remove(id);
  }
}
