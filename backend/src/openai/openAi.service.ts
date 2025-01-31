import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { LlmCallerInterface } from "src/llm/llm-interface";
import OpenAI from 'openai';
import { PrismaService } from "src/prisma/prisma.service";

/*
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
*/
@Injectable()
export class OpenAiService implements LlmCallerInterface {
    private client
    constructor(
        private configService: ConfigService,
    ) { 
        this.client = new OpenAI({
            apiKey: process.env['OPEN_AI_KEY'],
          })
    }

    async getPlaylist(): Promise<any> {
        return {test: 'open ai'}
    }

    async makeCall(prompt: string): Promise<OpenAI.Chat.ChatCompletion> {
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-4o',
          });

          return chatCompletion
    }

    async getCategories(prompt, quantity): Promise<any> {
        const constructedPrompt = `Here is a list of songs. Provide for me a list of ${quantity} categories, based on these songs ${prompt}`
        const categories = await this.makeCall(constructedPrompt)
        return categories.choices[0].message.content
    }
}