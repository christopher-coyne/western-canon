import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LlmCallerInterface } from "src/llm/llm-interface";
import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from 'openai';
import { z } from "zod";
import { Playlist } from "./playlist";

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

    async generatePlaylistSongs(category: Playlist): Promise<any> {
        const PlaylistReponse = z.object({
            songs: z.array(z.object(
                {name: z.string(), band: z.string()}
            ))
          });

          const prompt = `Here is a music playlist category that i want you to provide a list of recommended songs for. category name: ${category.name}
          category description: ${category.description}. List of songs that the user provided that form this category: (dont include these songs in your category : ${category.relatedSongs})
          `

          const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(prompt) }],
            model: 'gpt-4o-mini',
            response_format: zodResponseFormat(PlaylistReponse, "playlist"),
          });

          console.log('generated songs ', chatCompletion.choices[0].message.content)
          return JSON.parse(chatCompletion.choices[0].message.content ?? '{songs: []}').songs
    }

    async makeCall(prompt: string): Promise<OpenAI.Chat.ChatCompletion> {
        console.log('GETTING CATEGORIES WITH PROMPT ', prompt)
        const CategoryResponse = z.object({
            categories: z.array(z.object({name: z.string(),
            description: z.string(),
            relatedSongs: z.array(z.string())},))
          });
          

        // {"name": "sub category name", "relatedSongs": "the songs in the list that are related to this", "description": "subcategory description"}
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(prompt) }],
            model: 'gpt-4o-mini',
            response_format: zodResponseFormat(CategoryResponse, "category"),
          });

          return chatCompletion
    }

    async generatePlaylists(prompt, quantity): Promise<Playlist[]> {
        const constructedPrompt = `Here is a list of songs. Provide for me a list of ${quantity} musical sub categories, based on these songs. ${JSON.stringify(prompt)}`
        const categories = await this.makeCall(constructedPrompt)

        console.log('CHAT COMPLETION ', categories.choices[0].message.content)
        return JSON.parse(categories.choices[0].message.content ?? '{categories: []}').categories
    }
}
