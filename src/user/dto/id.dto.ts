import { IsUUID } from 'class-validator';

export class idDTO {
  @IsUUID(4)
  id: string;
}
