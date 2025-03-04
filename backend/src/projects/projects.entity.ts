import { IsString } from "class-validator";
import { Exclude, Type } from "class-transformer";
import { Project } from "@prisma/client";
import { UserEntity } from "src/users/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectEntity implements Project {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: UserEntity })
  @Type(() => UserEntity)
  creator: UserEntity;

  @ApiProperty()
  @Exclude()
  creatorId: string;

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;
}
