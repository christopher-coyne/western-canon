import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";
// import { HttpStatus } from "@nestjs/common";

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

import { HttpStatus } from "@nestjs/common";

export class PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  isSuccess: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
  errorCode?: HttpStatus;

  constructor(
    isSuccess: boolean,
    data: T[],
    pagination: PaginationMeta,
    message?: string,
    errorCode?: HttpStatus
  ) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.pagination = pagination;
    this.message = message;
    this.errorCode = errorCode;
  }

  static ok<U>(
    items: U[],
    total: number,
    page: number,
    pageSize: number,
    message?: string
  ): PaginatedResult<U> {
    const pagination = {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };

    return new PaginatedResult(true, items, pagination, message);
  }

  static fail<U>(message: string, errorCode: HttpStatus): PaginatedResult<U> {
    const emptyPagination = {
      total: 0,
      page: 1,
      pageSize: 0,
      totalPages: 0,
    };

    return new PaginatedResult(false, [], emptyPagination, message, errorCode);
  }
}
