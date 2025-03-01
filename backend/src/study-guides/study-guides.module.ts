import { Module } from "@nestjs/common";
import { StudyGuidesService } from "./study-guides.service";

@Module({
  imports: [StudyGuidesService],
  providers: [StudyGuidesService],
})
export class StudyGuidesModule {}
