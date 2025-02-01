import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { OpenAiService } from "src/openai/openAi.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LlmCallerInterface } from "./llm-interface";
import { SongListItemDto } from "src/recommendations/DTO/song-list-item.dto";
import { MusicRecommendationCategory } from "src/openai/music-category.entity";

@Injectable()
export class LlmService {
    constructor(private prismaService: PrismaService, private openAiService: OpenAiService) { }

    async generatePlaylist(category: MusicRecommendationCategory): Promise<any> {
        // now that we have categories - generate playlists
        const playlist = await this.openAiService.generatePlaylist(category)
        return playlist
    }

    async generatePlaylistCategories({prompt, quantity}: {prompt: SongListItemDto[], quantity: number}) {
        const categories = await this.openAiService.generatePlaylistCategories(prompt, quantity)
        console.log('CATEGORIES!!!! ', categories)

        return categories
    }
}