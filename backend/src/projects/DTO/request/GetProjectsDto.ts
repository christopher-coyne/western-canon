import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class GetProjectsDto {
  @ApiProperty({
    description: "Page number for pagination",
    required: false,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: "Search query string",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    description: "Filter by difficulties (comma-separated)",
    required: false,
    type: String,
    example: "beginner,intermediate",
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value.split(",") : undefined))
  difficulties?: string[];

  @ApiProperty({
    description: "Filter by tag IDs (comma-separated)",
    required: false,
    type: String,
    example: "1,2,3",
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value.split(",") : undefined))
  tags?: string[];
}
