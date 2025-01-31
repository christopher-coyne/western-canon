import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { OpenAiService } from "src/openai/openAi.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LlmCallerInterface } from "./llm-interface";

@Injectable()
export class LlmService {
    constructor(private prismaService: PrismaService, private openAiService: OpenAiService) { }

    async getPlaylist(): Promise<any> {
        const openAiResponse = await this.openAiService.getPlaylist()
        return openAiResponse
    }
}