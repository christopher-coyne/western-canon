import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SongListItemDto } from './song-list-item.dto';

export class CreateRecommendationDto {
@ApiProperty()
@IsNumber()
  playlistLength: number;

  @ApiProperty()
@IsNumber()
  playlistQuantity: number;

  @ApiProperty()
  prompt: SongListItemDto[];
}