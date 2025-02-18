import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { SongListItemDto } from '../DTO/song-list-item.dto';
import { Type } from 'class-transformer';

export class SongEntity {
  @IsString()
  id: string;

  @ApiProperty()
  input: string;

  @ApiProperty()
  spotifyId: string;
}