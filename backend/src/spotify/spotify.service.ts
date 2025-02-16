import { Injectable } from "@nestjs/common";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SpotifyService {
    private spotifyApi: SpotifyApi;

    constructor(private configService: ConfigService) {
        this.spotifyApi = SpotifyApi.withClientCredentials(
            this.configService.get('SPOTIFY_CLIENT_ID') ?? '',
            this.configService.get('SPOTIFY_CLIENT_SECRET') ?? ''
        );
        /*
        this.spotifyApi = new SpotifyApi(
          this.configService.get('SPOTIFY_CLIENT_ID') ?? '',
          this.configService.get('SPOTIFY_CLIENT_SECRET') ?? '',
        );
        */
      }

    async searchTracks(artist: string, trackName: string) {
    const searchResponse = await this.spotifyApi.search('track:black coffee artist:black flag', ['track'])
    console.log('search response ', searchResponse.tracks.items.length ? searchResponse.tracks.items[0] : null)
    // return response.body.tracks.items;
  }
}