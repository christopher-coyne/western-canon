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

export class AuthorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  birthYear: number | null;

  @ApiProperty()
  @IsBoolean()
  birthYearApprox: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  deathYear: number | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  intro: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsDate()
  deletedAt: Date;

  @ApiProperty({ type: () => [WorkDto] })
  @Type(() => WorkDto)
  works: WorkDto[];
}
