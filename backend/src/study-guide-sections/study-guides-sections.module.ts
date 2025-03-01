import { Module } from '@nestjs/common';
import { StudyGuidesSectionsService } from './study-guides-sections.service';

@Module({
  imports: [StudyGuidesSectionsService],
  providers: [StudyGuidesSectionsService],
})
export class StudyGuidesSectionsModule {}