import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/common/DTO/Pagination.dto";

export class GetWorksDto extends PaginationQueryDto {
  // Add any additional query parameters specific to works here
  // For example:
  // @ApiPropertyOptional({
  //   description: "Filter works by author ID",
  // })
  // authorId?: string;
}
