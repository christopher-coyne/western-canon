import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { OpenAiService } from 'src/openai/openAi.service';

@Module({
  providers: [LlmService, OpenAiService],
  exports: [LlmService]
})
export class LlmModule {}