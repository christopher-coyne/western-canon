import { IsString } from "class-validator";
import { Exclude, Type } from "class-transformer";
import { Project } from "@prisma/client";
import { UserEntity } from "src/users/user.entity";

/*
  id          String   @id @default(cuid())
  title       String
  description String // Markdown content
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  */
export class ProjectEntity implements Project {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => UserEntity)
  creator: UserEntity;

  @Exclude()
  creatorId: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
