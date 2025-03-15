import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { WorkDto } from "src/works/DTO/response/works.dto";
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

  @ApiProperty({ type: () => WorkDto })
  @Type(() => WorkDto)
  work: WorkDto;
  /*
  work, favorites */
}
