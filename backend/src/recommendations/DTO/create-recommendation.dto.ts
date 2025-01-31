import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecommendationDto {
@ApiProperty()
@IsNumber()
  @IsString()
  playlistLength: number;

  @ApiProperty()
@IsNumber()
  @IsString()
  playlistQuantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prompt: string;
}