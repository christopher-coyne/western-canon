import { SongListItemDto } from "src/recommendations/DTO/song-list-item.dto"

export interface LlmCallerInterface {
    getPlaylist: () => any
    getCategories: (prompt: SongListItemDto, quantity: number) => any
    makeCall: (prompt: SongListItemDto) => any
}