import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/DTO/Pagination.dto";

export class FeedDto {
  @ApiPropertyOptional({
    description: "Get snippets starting from this snippet id",
  })
  @IsInt()
  cursor: number;

  @ApiPropertyOptional({
    description: "Direction of the feed",
  })
  @IsString()
  direction: "forward" | "backward";
}
