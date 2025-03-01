import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/*
model Section {
  id           String     @id @default(cuid())
  title        String
  order        Int
  studyGuide   StudyGuide @relation(fields: [studyGuideId], references: [id])
  studyGuideId String
  questions    Question[]
}
  */
export class CreateStudyGuideSectionDto {

@ApiProperty()
@IsString()
@IsNotEmpty()
  title: string;

  @ApiProperty()
@IsNumber()
@IsPositive()
  order: number;
}