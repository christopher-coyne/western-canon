import { Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { MusicPlaylist, PlaylistCollection } from "@prisma/client";
import { Result } from "src/domain/result";
import { RecommendationsService } from "./recommendations.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { MusicPlaylistEntity } from "./entities/music-playlist.entity";
import { PlaylistCollectionEntity } from "./entities/playlist-collection.entity";
import { AddSongReactionDto } from "./DTO/add-song-reaction.dto";

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

    @UseGuards(AuthenticatedGuard)
    @Post('/song/:id/reaction')
    async addSongReaction(@Req() req, @Param('id') id: string, @Body() body: AddSongReactionDto): Promise<Result<Boolean>> {
        const userId = req.user.id
        console.log('BODY ', body)
        return Result.ok(await this.recommendationsService.addSongReaction({userId, songId: id, reactionType: body.reactionType}))
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/song/:id/reaction')
    async deleteSongReaction(@Req() req, @Param('id') id: string): Promise<Result<Boolean>> {
        const userId = req.user.id
        return Result.ok(await this.recommendationsService.deleteSongReaction(userId, id))
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/playlist/:id/favorite')
    async favoritePlaylist(@Req() req, @Param('id') id: string): Promise<Result<Boolean>> {
        const userId = req.user.id
        return Result.ok(await this.recommendationsService.favoritePlaylist(userId, id))
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/playlist/:id/favorite')
    async unFavoritePlaylist(@Req() req, @Param('id') id: string): Promise<Result<Boolean>> {
        const userId = req.user.id
        return Result.ok(await this.recommendationsService.unFavoritePlaylist(userId, id))
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/playlist/favorite')
    async getFavoritePlaylists(@Req() req): Promise<Result<MusicPlaylist[]>> {
        const userId = req.user.id
        return Result.ok(await this.recommendationsService.getFavoritePlaylists(userId))
    }
}