import { Body, Controller, Get, Injectable, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { MusicPlaylist, PlaylistCollection } from "@prisma/client";
import { Result } from "src/domain/result";
import { RecommendationsService } from "./recommendations.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { MusicPlaylistEntity } from "./entities/music-playlist.entity";
import { Playlist } from "./DTO/llm-playlist.dto";
import { PlaylistCollectionEntity } from "./entities/playlist-collection.entity";

@Controller('recommendations')
@Injectable()
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('')
    async createRecommendation(@Req() req, @Body() body: CreateRecommendationDto): Promise<Result<PlaylistCollection>> {
        const userId = req.user.id
        console.log('user id ', userId)
        return Result.ok(await this.recommendationsService.createRecommendation(userId, body))
    }

    @Get('/playlist-collection/:id')
    async getPlaylistCollection(@Param('id') id: string): Promise<Result<PlaylistCollectionEntity>> {
        return Result.ok(await this.recommendationsService.getPlaylistCollectionById(id))
    }

    @Get('/playlist/:id')
    async getPlaylist(@Param('id') id: string): Promise<Result<MusicPlaylistEntity>> {
        return Result.ok(await this.recommendationsService.getPlaylistById(id))
    }
}