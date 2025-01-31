import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";

@Injectable()
export class RecommendationsService {
    constructor(private prisma: PrismaService) { }

    async createRecommendation(recommendation: CreateRecommendationDto): Promise<MusicRecommendation> {
        console.log('creating recommendation... ', recommendation)
        const newRec = await this.prisma.musicRecommendation.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })
        return newRec
    }

    async getRecommendations(): Promise<MusicRecommendation[]> {
        const allRecommendations = await this.prisma.musicRecommendation.findMany()
        return allRecommendations
    }
}