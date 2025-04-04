import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/DTO/Pagination.dto";

export class GetSnippetsDto extends PaginationQueryDto {
  // Add any additional query parameters specific to snippets here
  // For example:
  // @ApiPropertyOptional({
  //   description: "Filter snippets by work ID",
  // })
  // workId?: string;

  @ApiPropertyOptional({
    description: "Filter snippets by query",
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({
    description: "Filter snippets by genre ID",
  })
  @IsOptional()
  @IsString()
  genreId?: string;
}
