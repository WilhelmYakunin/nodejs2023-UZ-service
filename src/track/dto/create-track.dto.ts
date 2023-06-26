import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  artistId: string;

  albumId: string;
}
