import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { LlmCallerInterface } from "src/llm/llm-interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OpenAiService implements LlmCallerInterface {
    constructor(private prismaService: PrismaService) { }

    async getPlaylist(): Promise<any> {
        return {test: 'open ai'}
    }
}