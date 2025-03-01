import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
/*
model StudyGuide {
  id          String               @id @default(cuid())
  title       String
  description String
  createdAt   DateTime             @default(now())
  updatedAt   DateTime             @updatedAt
  author      User                 @relation(fields: [authorId], references: [id])
  authorId    String
  sections    Section[]
  tags        Tag[]
  favorites   StudyGuideFavorite[]
}
  */
export class CreateStudyGuideDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
