import { IsString } from "class-validator";
import { Exclude, Type } from "class-transformer";
import { Project, TechnologyType } from "@prisma/client";
import { UserEntity } from "src/users/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/users/DTO/GetUserDto";

export class TechnologyTagDto {
  @ApiProperty({
    description: "Unique identifier of the technology tag",
    example: "clg2hf68v0000a9rz3xzd4a9f",
  })
  id: string;

  @ApiProperty({
    description: "Name of the technology tag",
    example: "React",
  })
  name: string;

  @ApiProperty({
    description: "Type of technology",
    enum: TechnologyType,
    example: "FRONTEND",
  })
  type: TechnologyType;
}
