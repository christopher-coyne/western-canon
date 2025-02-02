import { Injectable } from "@nestjs/common";
import { MediaType, PlaylistCollection, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { LlmService } from "src/llm/llm.service";

@Injectable()
export class RecommendationsService {
    constructor(private prismaService: PrismaService, private llmService: LlmService) { }

    async createRecommendation(recommendation: CreateRecommendationDto): Promise<PlaylistCollection> {
        const playlistSets = await this.llmService.generatePlaylistCategories({prompt: recommendation.prompt, quantity: recommendation.playlistQuantity})

        // now that we have categories - generate playlists
        const playlistsPromises: Promise<any>[] = []
        for (const category of playlistSets) {
            playlistsPromises.push(this.llmService.generatePlaylist(category))
        }

        const createdPlaylists = await Promise.all(playlistsPromises)
        console.log('CREATED PLAYLISTS ', createdPlaylists)


        // create music recommendation
        const newRec = await this.prismaService.playlistCollection.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })

        // create playlists with songs
        for (let idx = 0; idx < createdPlaylists.length; idx++) {
            await this.prismaService.musicPlaylist.create({
                data: {
                    name: playlistSets[idx].name,
                    description: playlistSets[idx].description,
                    musicRecommendationId: newRec.id,
                    songs: {
                        create: createdPlaylists[idx].map(song => ({
                            name: song.name,
                            length: 1,
                            band: song.band,
                        }))
                    }
                }
            });
        }

        return newRec
    }

    async getRecommendations(): Promise<PlaylistCollection[]> {
        const allRecommendations = await this.prismaService.playlistCollection.findMany()
        return allRecommendations
    }
}