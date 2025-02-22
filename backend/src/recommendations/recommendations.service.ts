import { Injectable, NotFoundException } from "@nestjs/common";
import { PlaylistCollection, Prisma, ReactionType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./DTO/create-recommendation.dto";
import { LlmService } from "src/llm/llm.service";
import { SpotifyService } from "src/spotify/spotify.service";
import { Playlist } from "./DTO/llm-playlist.dto";
import { z } from "zod";
import { MusicPlaylistEntity } from "./entities/music-playlist.entity";
import { PlaylistCollectionEntity } from "./entities/playlist-collection.entity";
import { Track } from "@spotify/web-api-ts-sdk";

@Injectable()
export class RecommendationsService {
    constructor(private prismaService: PrismaService, private llmService: LlmService, private spotifyService: SpotifyService) { }

    async generatePlaylistCategories(data: CreateRecommendationDto): Promise<{playlistCategories: {name: string, description: string, relatedSongs: string[]}[]}> {
        const PlaylistCategory = z.object({
            playlistCategories: z.array(z.object(
                {name: z.string(), description: z.string(), relatedSongs: z.array(z.string())}
            ))
            });

        const constructedPrompt = `Here is a list of songs. Provide for me a list of ${data.playlistQuantity} musical sub categories, based on these songs. ${JSON.stringify(data.prompt)}
        return your response as a JSON object, in the following format: {playlistCategories: [{name: "string", description: "string", relatedSongs: ["song1"...]}...]} where relatedSongs 
        is a list of the songs from the input that correspond to this playlistCategory.
        `
        const playlistSets = await this.llmService.generateResponse(constructedPrompt, PlaylistCategory, 'playlist')
        console.log('playlist set ', playlistSets)
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

    async matchSongsToSpotify(createdPlaylists: any[]): Promise<any> {
        const playlistResponses = []

        for (const playlist of createdPlaylists) {
            const playlistSpotifyResponses: Promise<Track | undefined>[] = []
            for (const song of playlist.songs) {
                playlistSpotifyResponses.push(this.spotifyService.searchTracks(song.band, song.name))
            }
            const spotifyMatchedPlaylist = await Promise.all(playlistSpotifyResponses)
            console.log('spotify matched playlist ', spotifyMatchedPlaylist)
        }
        /*
        const spotifyResponsePromises: any = []
        for (const playlist of createdPlaylists) {
            const playlistSpotifyResponses: Promise<Track | undefined>[] = []
            for (const song of playlist.songs) {
                playlistSpotifyResponses.push(this.spotifyService.searchTracks(song.band, song.name))
            }
            spotifyResponsePromises.push(playlistSpotifyResponses)
        }

        const allSpotifyMatches = await Promise.all(spotifyResponsePromises)
        */

        /*
        const spotifySearch = await this.spotifyService.searchTracks('black flag', 'my war')
        console.log('spotify search ', spotifySearch)
        */
    }

    async createRecommendation(creatorId: string, data: CreateRecommendationDto): Promise<PlaylistCollection> {
        const playlistSets = await this.generatePlaylistCategories(data)

        const createdPlaylists = await this.generatePlaylistSongs(playlistSets.playlistCategories)

        // create music recommendation
        console.log('CREATOR ID ', String(creatorId))
        const newRec = await this.prismaService.playlistCollection.create({ data: {prompt: 'test', creatorId: creatorId} })

        console.log('playlist sets ', playlistSets)
        console.log('created playlists ', createdPlaylists)

        // Match songs in the created Playlists with spotify records
        // TODO - in future, probably want to match this with other music platforms as well
        await this.matchSongsToSpotify(createdPlaylists)

        for (let idx = 0; idx < createdPlaylists.length; idx++) {
            await this.prismaService.musicPlaylist.create({
                data: {
                    name: playlistSets.playlistCategories[idx].name,
                    description: playlistSets.playlistCategories[idx].description,
                    playlistCollectionId: newRec.id,
                    relatedSongs: playlistSets.playlistCategories[idx].relatedSongs,
                    songs: {
                        create: createdPlaylists[idx].songs.map(song => ({
                            input: `${song.name} ${song.band}`,
                            spotifyId: 'test spotify input'
                        }))
                    }
                }
            });
        }

        return newRec
    }

    /*
    async getRecommendations(): Promise<PlaylistCollection[]> {
        const allRecommendations = await this.prismaService.playlistCollection.findMany()
        return allRecommendations
    }
        */

    async getPlaylistCollectionById(id: string): Promise<PlaylistCollectionEntity> {
        const playlistCollection = await this.prismaService.playlistCollection.findUnique({
            where: {id},
            include: {
                playlists: {
                    include: {
                        songs: true
                    }
                }
            }
        })

        if (!playlistCollection) {
            throw new NotFoundException()
        }

        return playlistCollection
    }

    async getPlaylistById(id: string): Promise<MusicPlaylistEntity> {
        const playlist = await this.prismaService.musicPlaylist.findUnique({
            where: {id},
            include: {
                songs: true
            }
        })

        if (!playlist) {
            throw new NotFoundException()
        }

        return playlist
    }

    async addSongReaction({userId, songId, reactionType}: {userId: string, songId: string, reactionType: ReactionType}) {
        const created = await this.prismaService.songReaction.upsert({
            where: {
              userId_songId: {
                userId,
                songId,
              }
            },
            create: {
              userId,
              songId,
              reaction: reactionType,
            },
            update: {
              reaction: reactionType,
            }
          });

          console.log('created ', created)
          return true
    }

    async deleteSongReaction(userId: string, songId: string) {
        await this.prismaService.songReaction.delete({
            where: {
              userId_songId: {
                userId,
                songId,
              }
            },
          });

          return true
    }

    async favoritePlaylist(userId: string, playlistId: string) {
        const playlist = await this.prismaService.musicPlaylist.findUnique({where: {id: playlistId}})

        if (!playlist) {
            throw new NotFoundException()
        }

        await this.prismaService.favoriteMusicPlaylist.create({
            data: {userId: userId, musicPlaylistId: playlistId}
          });
          return true
    }

    async unFavoritePlaylist(userId: string, playlistId: string) {
        const playlist = await this.prismaService.musicPlaylist.findUnique({where: {id: playlistId}})

        if (!playlist) {
            throw new NotFoundException()
        }
        await this.prismaService.favoriteMusicPlaylist.delete({
            where: {
                userId_musicPlaylistId: {
                    userId: userId,
                    musicPlaylistId: playlistId
                }
            }
          });
          return true
    }

    async getFavoritePlaylists(userId: string) {
        const favoritePlaylists = await this.prismaService.favoriteMusicPlaylist.findMany({
            where: {userId},
            include: {playlist: {include: {songs: true}}}
        })

        return favoritePlaylists.map(favoritePlaylists => favoritePlaylists.playlist)
    }

}