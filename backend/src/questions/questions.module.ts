import { Module } from "@nestjs/common";
import { QuestionsService } from "./questions.service";

@Module({
  imports: [QuestionsService],
  providers: [QuestionsService],
})
export class QuestionsModule {}
