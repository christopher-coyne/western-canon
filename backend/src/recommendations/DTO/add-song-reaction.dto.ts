import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SongListItemDto } from './song-list-item.dto';
import { ReactionType } from '@prisma/client';

export class AddSongReactionDto {
  @ApiProperty()
    @IsEnum(ReactionType)
  reactionType: ReactionType;
}