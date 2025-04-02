import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { WorkDto } from "src/works/DTO/response/works.dto";
import { FavoriteDto } from "./list-snippet.dto";
import { Snippet } from "@prisma/client";
/*
  id        String     @id @default(uuid())
  content   String     @db.Text
  analysis  String?    @db.Text
  workId    String

  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  deletedAt DateTime?
  
  work      Work       @relation(fields: [workId], references: [id])
  favorites Favorite[]
  */
export class SnippetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  analysis: string;

  @ApiProperty()
  workId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  deletedAt: Date;

  @ApiProperty()
  order: number;

  /*
  work, favorites */
  @ApiProperty({ type: () => WorkDto })
  @Type(() => WorkDto)
  work: WorkDto;

  @ApiProperty({ type: () => FavoriteDto, isArray: true })
  @Type(() => FavoriteDto)
  favorites: FavoriteDto[];
}
