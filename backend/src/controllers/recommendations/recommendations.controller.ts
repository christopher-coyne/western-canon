import { Controller, Get, Injectable, Post } from "@nestjs/common";
import { MusicRecommendation } from "@prisma/client";
import { Result } from "src/domain/result";
import { RecommendationService } from "src/services/recommendation/recommendation.service";

@Controller('recommendations')
@Injectable()
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationService) {}

    /*
    @Post('')
    createRecommendation(): Promise<Result<MusicRecommendation[]>> {
        // return await this.createRecommendation()
        return Result.ok([])
    }
        */

    @Get('')
    async getRecommendations(): Promise<Result<MusicRecommendation[]>> {
        const recommendations = await this.recommendationsService.getRecommendations()
        return Result.ok(recommendations)
    }
}