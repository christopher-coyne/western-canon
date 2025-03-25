import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Exclude, Transform } from "class-transformer";

export class UpdateCursorDto {
  @ApiProperty({
    description: "new cursor value",
    example: 1,
  })
  cursor: number;
}
