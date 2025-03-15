import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AuthorDto } from "src/author/DTO/response/authors.dto";
import { GenreDto } from "src/genre/DTO/response/genre.dto";

export class WorkGenreDto {
  @ApiProperty({ type: () => GenreDto })
  @Type(() => GenreDto)
  genre: GenreDto;
}
