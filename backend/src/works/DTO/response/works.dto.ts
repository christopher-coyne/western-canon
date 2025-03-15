import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AuthorDto } from "src/author/DTO/response/authors.dto";
import { WorkGenreDto } from "./work-genre.dto";

export class WorkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  introductions: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  pageCount: number | null;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  publishYear: number | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsDate()
  deletedAt: Date;

  @ApiProperty({ type: () => AuthorDto })
  @Type(() => AuthorDto)
  author: AuthorDto;

  @ApiProperty({ type: () => [WorkGenreDto] })
  @Type(() => WorkGenreDto)
  genres: WorkGenreDto[];
}
