import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecommendationDto {
@ApiProperty()
@IsNumber()
  playlistLength: number;

  @ApiProperty()
@IsNumber()
  playlistQuantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prompt: string;
}