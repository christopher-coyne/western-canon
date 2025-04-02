import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Exclude, Transform } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateCursorDto {
  @ApiProperty({
    description: "new cursor value",
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  cursor: number;
}
