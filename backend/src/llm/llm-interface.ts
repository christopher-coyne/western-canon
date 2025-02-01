import { MusicRecommendationCategory } from "src/openai/music-category.entity"
import { SongListItemDto } from "src/recommendations/DTO/song-list-item.dto"

export interface LlmCallerInterface {
    generatePlaylist: (category: MusicRecommendationCategory) => any
    generatePlaylistCategories: (prompt: SongListItemDto, quantity: number) => Promise<MusicRecommendationCategory[]>
    makeCall: (prompt: string) => any
}