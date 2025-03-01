import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LlmCallerInterface } from "src/llm/llm-interface";
import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from 'openai';
import Anthropic from "@anthropic-ai/sdk";

@Injectable()
export class AnthropicService implements LlmCallerInterface {
    private anthropicClient: Anthropic
    constructor(
        private configService: ConfigService,
    ) { 
        this.anthropicClient = new Anthropic({
            apiKey: configService.get('ANTHROPIC_KEY')
        })
    }

    async generateResponse(prompt: string, validator: any, validatorName: string): Promise<string> {
        /*
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(prompt) }],
            model: 'gpt-4o',
            response_format: zodResponseFormat(validator, validatorName),
          });
          return chatCompletion.choices[0].message.content ?? ''
        */

          const msg = await this.anthropicClient.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 5000,
            messages: [{ role: "user", content: prompt }],
          });

          const returnMsg = msg.content[0] as {text: string}
          return returnMsg.text
    }
}
