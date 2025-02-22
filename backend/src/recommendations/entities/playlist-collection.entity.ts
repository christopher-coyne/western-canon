import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MusicPlaylistEntity } from './music-playlist.entity';

export class PlaylistCollectionEntity {

    @IsString()
    id: string

    @IsString()
    prompt: string | null
    
    @ValidateNested()
    @Type(() => MusicPlaylistEntity)
    playlists: MusicPlaylistEntity[];
}