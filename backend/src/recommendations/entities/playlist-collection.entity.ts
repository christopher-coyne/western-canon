import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { SongListItemDto } from '../DTO/song-list-item.dto';
import { Type } from 'class-transformer';
import { MusicPlaylist } from '@prisma/client';
import { MusicPlaylistEntity } from './music-playlist.entity';

/*
  id          Int             @id @default(autoincrement())
  mediaType   MediaType
  description String
  prompt      String
  playlists   MusicPlaylist[]
  */
export class PlaylistCollectionEntity {

    @IsString()
    id: string

    @IsString()
    description: string

    @IsString()
    prompt: string
    
    @ValidateNested()
    @Type(() => MusicPlaylistEntity)
    playlists: MusicPlaylistEntity[];
}