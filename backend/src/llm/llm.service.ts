import { Injectable } from "@nestjs/common";
import { OpenAiService } from "src/openai/openAi.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SongListItemDto } from "src/recommendations/DTO/song-list-item.dto";
import { Playlist } from "src/openai/playlist";

@Injectable()
export class LlmService {
    constructor(private prismaService: PrismaService, private openAiService: OpenAiService) { }

    async generateResponse(prompt: string, validator: any, validatorName: string): Promise<string> {
        return await this.openAiService.generateResponse(prompt, validator, validatorName)
    }

    async generatePlaylist(category: Playlist): Promise<any> {
        // now that we have categories - generate playlists
        const playlist = await this.openAiService.generatePlaylistSongs(category)
        return playlist
    }

    // given a list of songs, return categories based on these songs
    async generatePlaylistCategories({prompt, quantity}: {prompt: SongListItemDto[], quantity: number}) {
        const categories = await this.openAiService.generatePlaylists(prompt, quantity)
        console.log('CATEGORIES!!!! ', categories)

        return categories
    }
}