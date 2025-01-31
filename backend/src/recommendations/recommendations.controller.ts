import { Controller, Get, Injectable, Post, UseGuards } from "@nestjs/common";
import { MusicRecommendation } from "@prisma/client";
import { Result } from "src/domain/result";
import { RecommendationsService } from "./recommendations.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller('recommendations')
@Injectable()
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationsService) {}

      @UseGuards(AuthenticatedGuard)
    @Post('')
    async createRecommendation(): Promise<Result<any>> {
        return Result.ok(await this.recommendationsService.createRecommendation())
    }

    @Get('')
    async getRecommendations(): Promise<Result<MusicRecommendation[]>> {
        const recommendations = await this.recommendationsService.getRecommendations()
        return Result.ok(recommendations)
    }
}