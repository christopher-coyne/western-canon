import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LlmCallerInterface } from "src/llm/llm-interface";
import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from 'openai';

@Injectable()
export class OpenAiService implements LlmCallerInterface {
    private client
    constructor(
        private configService: ConfigService,
    ) { 
        this.client = new OpenAI({
            apiKey: this.configService.get('OPEN_AI_KEY')
          })
    }

    async generateResponse(prompt: string, validator: any, validatorName: string): Promise<string> {
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(prompt) }],
            model: 'gpt-4o-mini',
            response_format: zodResponseFormat(validator, validatorName),
          });
          return chatCompletion.choices[0].message.content ?? ''
    }
}
