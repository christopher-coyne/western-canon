import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
/*
model Work {
  id           String     @id @default(uuid())
  title        String
  introduction String     @db.Text
  pageCount    Int?
  publishYear  Int?
  authorId     String

  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  deletedAt DateTime?

  author       Author     @relation(fields: [authorId], references: [id])
  snippets     Snippet[]
  genres       WorkGenre[]
  
  @@map("works")
}
  */
export class WorkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  introductions: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  pageCount: number | null;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  publishYear: number | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsDate()
  deletedAt: Date;

  /*
  work, favorites */
}
