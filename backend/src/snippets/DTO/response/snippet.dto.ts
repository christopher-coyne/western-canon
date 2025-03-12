import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  analysis: string | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workId: string;

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
