import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MusicRecommendationCategory {

@IsNumber()
  name: number;


@IsNumber()
  description: number;

  relatedSongs: string[];
}