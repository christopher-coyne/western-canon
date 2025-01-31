import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

@Injectable()
export class LlmService {
    constructor(private prisma: PrismaService) { }

    async getRecommendation(params: {
        prompt: string;
    }): Promise<any> {
        console.log('hey...')
        return {test: 'test'}
    }
}