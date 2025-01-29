import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationService {
    constructor(private prisma: PrismaService) { }

    async createRecommendation(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<MusicRecommendation> {
        console.log('hey...')
        const newRec = this.prisma.musicRecommendation.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })
        return newRec
    }

    async getRecommendations(): Promise<MusicRecommendation[]> {
        const allRecommendations = await this.prisma.musicRecommendation.findMany()
        return allRecommendations
    }
}