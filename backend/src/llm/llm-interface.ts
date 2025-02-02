import { Playlist } from "src/openai/playlist"
import { SongListItemDto } from "src/recommendations/DTO/song-list-item.dto"

export interface LlmCallerInterface {
    generatePlaylistSongs: (category: Playlist) => any
    generatePlaylists: (prompt: SongListItemDto, quantity: number) => Promise<Playlist[]>
    makeCall: (prompt: string) => any
}