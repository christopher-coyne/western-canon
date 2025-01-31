import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { LlmService } from "src/llm/llm.service";

@Injectable()
export class RecommendationsService {
    constructor(private prismaService: PrismaService, private llmService: LlmService) { }

    async createRecommendation(recommendation: CreateRecommendationDto): Promise<MusicRecommendation> {
        console.log('creating recommendation... ', recommendation)
        const songCategories = await this.llmService.getPlaylistCategories({prompt: recommendation.prompt, quantity: recommendation.playlistQuantity})
        console.log('SONG CATEGORIES ', songCategories)
        const makeRec = await this.llmService.getPlaylist()
        const newRec = await this.prismaService.musicRecommendation.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })
        return makeRec
    }

    async getRecommendations(): Promise<MusicRecommendation[]> {
        const allRecommendations = await this.prismaService.musicRecommendation.findMany()
        return allRecommendations
    }
}