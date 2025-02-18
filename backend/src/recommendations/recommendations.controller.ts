import { Body, Controller, Get, Injectable, Post, UseGuards } from "@nestjs/common";
import { MusicPlaylist, PlaylistCollection } from "@prisma/client";
import { Result } from "src/domain/result";
import { RecommendationsService } from "./recommendations.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";

@Controller('recommendations')
@Injectable()
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('')
    async createRecommendation(@Body() body: CreateRecommendationDto): Promise<Result<PlaylistCollection>> {
        return Result.ok(await this.recommendationsService.createRecommendation(body))
    }

    @Get('')
    async getRecommendations(): Promise<Result<PlaylistCollection[]>> {
        const recommendations = await this.recommendationsService.getRecommendations()
        return Result.ok(recommendations)
    }

    @Get('/:id')
    async getRecommendation(): Promise<Result<PlaylistCollection[]>> {
        const recommendations = await this.recommendationsService.getRecommendations()
        return Result.ok(recommendations)
    }
}