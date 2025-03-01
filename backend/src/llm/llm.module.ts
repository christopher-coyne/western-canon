import { Module } from "@nestjs/common";
import { LlmService } from "./llm.service";
import { OpenAiService } from "src/openai/openAi.service";
import { AnthropicService } from "src/anthropic/anthropic.service";

@Module({
  imports: [OpenAiService, AnthropicService],
  providers: [LlmService],
  exports: [LlmService],
})
export class LlmModule {}
