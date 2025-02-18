import { Injectable } from "@nestjs/common";
import { MediaType, PlaylistCollection, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { LlmService } from "src/llm/llm.service";
import { SpotifyService } from "src/spotify/spotify.service";
import { Playlist } from "src/openai/playlist";
import { z } from "zod";
import { parse } from "path";

@Injectable()
export class RecommendationsService {
    constructor(private prismaService: PrismaService, private llmService: LlmService, private spotifyService: SpotifyService) { }

    async generatePlaylistCategories(data: CreateRecommendationDto): Promise<{playlistCategories: {name: string, description: string, relatedSongs: string[]}[]}> {
        const PlaylistCategory = z.object({
            playlistCategories: z.array(z.object(
                {name: z.string(), description: z.string(), relatedSongs: z.array(z.string())}
            ))
            });

        const constructedPrompt = `Here is a list of songs. Provide for me a list of ${data.playlistQuantity} musical sub categories, based on these songs. ${JSON.stringify(data.prompt)}`
        const playlistSets = await this.llmService.generateResponse(constructedPrompt, PlaylistCategory, 'playlist')
        return JSON.parse(playlistSets)
    }

    async generatePlaylistSongs(data: Playlist[]): Promise<{songs: {name: string, band: string}[]}[]> {
        const playlistsPromises: Promise<string>[] = []
        const PlaylistReponse = z.object({
            songs: z.array(z.object(
                {name: z.string(), band: z.string()}
            ))
          });
          console.log('generate playlist songs data ', data)
        for (const category of data) {
    
              const prompt = `Here is a music playlist category that i want you to provide a list of recommended songs for. category name: ${category.name}
              category description: ${category.description}. List of songs that the user provided that form this category: (dont include these songs in your category : ${category.relatedSongs})
              `
            playlistsPromises.push(this.llmService.generateResponse(prompt, PlaylistReponse, 'playlist'))
        }

        const results = await Promise.all(playlistsPromises)
        const parsedPlaylists: {songs: {name: string, band: string}[]}[] = []
        for (const result of results) {
            parsedPlaylists.push(JSON.parse(result))
        }
        return parsedPlaylists
    }

    async createRecommendation(data: CreateRecommendationDto): Promise<PlaylistCollection> {
        const playlistSets = await this.generatePlaylistCategories(data)
        console.log('playlist sets ', playlistSets)

        const createdPlaylists = await this.generatePlaylistSongs(playlistSets.playlistCategories)
        console.log('created Playlists ', createdPlaylists)
        for (const playlist of createdPlaylists) {
            console.log('songs: ', playlist.songs)
        }

        return {
            description: 'abc',
            id: 1,
            mediaType: MediaType.MUSIC,
            prompt: 'test prompt'
        } as PlaylistCollection


        // create music recommendation
        const newRec = await this.prismaService.playlistCollection.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })

        // TEST spotify searching
        const spotifySearch = await this.spotifyService.searchTracks('black flag', 'my war')
        console.log('spotify search ', spotifySearch)

        // create playlists with songs
        /*
          input           String
  musicPlaylistId Int
  spotifyId       String
  */
 /*
        for (let idx = 0; idx < createdPlaylists.length; idx++) {
            await this.prismaService.musicPlaylist.create({
                data: {
                    name: playlistSets[idx].name,
                    description: playlistSets[idx].description,
                    playlistCollectionId: newRec.id,
                    songs: {
                        create: createdPlaylists[idx].map(song => ({
                            length: 1,
                            band: song.band,
                        }))
                    }
                }
            });
        }

        return newRec
        */
    }

    async getRecommendations(): Promise<PlaylistCollection[]> {
        const allRecommendations = await this.prismaService.playlistCollection.findMany()
        return allRecommendations
    }
}