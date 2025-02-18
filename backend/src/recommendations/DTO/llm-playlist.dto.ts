import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Playlist {

@IsNumber()
  name: string;


@IsNumber()
  description: string;

  relatedSongs: string[];
}