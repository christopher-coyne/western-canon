import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { WorkDto } from "src/works/DTO/response/works.dto";
import { SnippetDto } from "src/snippets/DTO/response/snippet.dto";

export class FavoriteSnippetDto {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: () => SnippetDto })
  @Type(() => SnippetDto)
  snippet: SnippetDto;
}
