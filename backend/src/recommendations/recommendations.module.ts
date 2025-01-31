import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { LlmService } from 'src/llm/llm.service';

@Module({
  providers: [RecommendationsService, LlmService],
  exports: [RecommendationsService]
})
export class RecommendationsModule {}