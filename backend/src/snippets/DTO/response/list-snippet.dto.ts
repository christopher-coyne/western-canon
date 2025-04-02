import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { WorkDto } from "src/works/DTO/response/works.dto";

export class FavoriteDto {
  @ApiProperty()
  snippetId: string;
}

export class ListSnippetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  analysis: string;

  @ApiProperty()
  workId: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  deletedAt: Date;

  @ApiProperty({ type: () => WorkDto })
  @Type(() => WorkDto)
  work: WorkDto;
  /*
  work, favorites */

  @ApiProperty({ type: () => FavoriteDto, isArray: true })
  @Type(() => FavoriteDto)
  favorites: FavoriteDto[];
}
