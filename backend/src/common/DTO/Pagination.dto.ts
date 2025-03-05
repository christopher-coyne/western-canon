import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

// Input DTO for pagination requests
export class PaginationQueryDto {
  @ApiProperty({
    description: "Page number (starts from 1)",
    default: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: "Number of items per page",
    default: 12,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 12;
}

// Response DTO for pagination metadata
export class PaginationMetaDto {
  @ApiProperty({ description: "Total number of items", type: Number })
  total: number;

  @ApiProperty({ description: "Current page number", type: Number })
  page: number;

  @ApiProperty({ description: "Number of items per page", type: Number })
  pageSize: number;

  @ApiProperty({ description: "Total number of pages", type: Number })
  totalPages: number;
}

// Generic paginated response DTO
export class PaginatedResponseDto<T> {
  @ApiProperty({ description: "Success status" })
  isSuccess: boolean;

  @ApiProperty({ description: "Response data" })
  data: T[];

  @ApiProperty({ description: "Pagination metadata", type: PaginationMetaDto })
  pagination: PaginationMetaDto;
}

// Helper function to create paginated response
export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedResponseDto<T> {
  return {
    data: items,
    isSuccess: true,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}
