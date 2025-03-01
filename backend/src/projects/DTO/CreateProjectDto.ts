import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/*
  title       String
  description String
  */
export class CreateProjectDto {

@ApiProperty()
@IsString()
@IsNotEmpty()
  title: string;

  @ApiProperty()
@IsString()
@IsNotEmpty()
  description: string;
}