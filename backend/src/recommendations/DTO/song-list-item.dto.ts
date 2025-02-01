import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SongListItemDto {
@ApiProperty()
@IsNumber()
  title: string;

  @ApiProperty()
  @IsNumber()
    band: string;
}