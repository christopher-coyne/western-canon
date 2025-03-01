import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
/*
model Question {
  id        String             @id @default(cuid())
  title     String
  link      String
  section   Section            @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  sectionId String
  favorites QuestionFavorite[]
}
  */
export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studyGuideId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sectionId: string;
}
