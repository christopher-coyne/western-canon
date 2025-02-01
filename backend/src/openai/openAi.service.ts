import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { LlmCallerInterface } from "src/llm/llm-interface";
import OpenAI from 'openai';
import { z } from "zod";

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

    async getPlaylist(): Promise<any> {
        return {test: 'open ai'}
    }

    async makeCall(prompt: any): Promise<OpenAI.Chat.ChatCompletion> {
        console.log('GETTING CATEGORIES WITH PROMPT ', prompt)
        const CategoryResponse = z.object({
            name: z.string(),
            description: z.string(),
            relatedSongs: z.array(z.string()),
          });
          

        // {"name": "sub category name", "relatedSongs": "the songs in the list that are related to this", "description": "subcategory description"}
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(prompt) }],
            model: 'gpt-4o-2024-08-06',
            response_format: { type: "json_object" }
          });

          return chatCompletion
    }

    async getCategories(prompt, quantity): Promise<any> {
        const constructedPrompt = `Here is a list of songs. Provide for me a list of ${quantity} musical sub categories, based on these songs. for each subcategory provide it in this format as JSON: [{"name": "sub category name", "relatedSongs": "the songs in the list that are related to this", "description": "subcategory description"}, ...] ${JSON.stringify(prompt)}`
        const categories = await this.makeCall(constructedPrompt)

        console.log('CHAT COMPLETION ', categories.choices[0].message.content)
        return categories.choices[0].message.content
    }
}

function zodResponseFormat(CalendarEvent: any, arg1: string) {
    throw new Error("Function not implemented.");
}
