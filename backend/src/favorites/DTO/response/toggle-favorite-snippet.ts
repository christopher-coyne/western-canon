import { ApiProperty } from "@nestjs/swagger";

export enum ToggleFavoriteAction {
  FAVORITE = "FAVORITE",
  UNFAVORITE = "UNFAVORITE",
}

export class ToggleFavoriteSnippetResponseDto {
  @ApiProperty({
    enum: ToggleFavoriteAction,
    description: "The action that was performed on the snippet",
  })
  action: ToggleFavoriteAction;

  @ApiProperty({
    description: "The ID of the snippet that was toggled",
  })
  snippetId: string;
}
