import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { LlmService } from "src/llm/llm.service";

@Injectable()
export class RecommendationsService {
    constructor(private prismaService: PrismaService, private llmService: LlmService) { }

    async createRecommendation(recommendation: CreateRecommendationDto): Promise<MusicRecommendation> {
        const playlistCategories = await this.llmService.generatePlaylistCategories({prompt: recommendation.prompt, quantity: recommendation.playlistQuantity})

        // now that we have categories - generate playlists
        const playlistsPromises: Promise<any>[] = []
        for (const category of playlistCategories) {
            playlistsPromises.push(this.llmService.generatePlaylist(category))
        }

        const createdPlaylists = await Promise.all(playlistsPromises)
        console.log('CREATED PLAYLISTS ', createdPlaylists)

        const newRec = await this.prismaService.musicRecommendation.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })
        return newRec
    }

    async getRecommendations(): Promise<MusicRecommendation[]> {
        const allRecommendations = await this.prismaService.musicRecommendation.findMany()
        return allRecommendations
    }
}