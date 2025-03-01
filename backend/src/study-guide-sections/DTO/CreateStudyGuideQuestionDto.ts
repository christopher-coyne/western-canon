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
export class CreateStudyGuideQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;
}
