import { Injectable } from "@nestjs/common";
import { AnthropicService } from "src/anthropic/anthropic.service";
import { OpenAiService } from "src/openai/openAi.service";

@Injectable()
export class LlmService {
    constructor(private openAiService: OpenAiService, private anthropicService: AnthropicService) { }

    async generateResponse(prompt: string, validator: any, validatorName: string): Promise<string> {
       const promptRes = await this.openAiService.generateResponse(prompt, validator, validatorName)
       return promptRes
    }

    async generateClaudeResponse(prompt: string): Promise<string> {
        return await this.anthropicService.generateResponse(prompt, '', '')
    }

}