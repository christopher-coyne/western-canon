import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { SongListItemDto } from '../DTO/song-list-item.dto';
import { Type } from 'class-transformer';
import { SongEntity } from './song.entity';

export class MusicPlaylistEntity {

    @IsString()
    id: string

    @IsString()
    name: string

    @IsString()
    description: string

    @ValidateNested()
    @Type(() => SongEntity)
    songs: SongEntity[];
}