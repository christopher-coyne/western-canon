import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Exclude, Transform } from "class-transformer";

export class UserProfileDto {
  @ApiProperty({
    description: "The unique identifier of the user",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "User's email address",
    example: "john.doe@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User's display name",
    example: "John Doe",
  })
  name: string;

  @ApiProperty({
    description: "User's role in the system",
    enum: Role,
    example: "USER",
  })
  role: Role;

  @ApiProperty({
    description: "User's cursor",
  })
  cursor: number;

  @ApiProperty({
    description: "Number of consecutive days the user has been active",
    example: 5,
  })
  dayStreak: number;

  @ApiProperty({
    description: "Last time the user was active",
    example: "2024-03-12T10:30:00Z",
  })
  lastActive: Date | null;

  @ApiProperty({
    description: "When the user account was created",
    example: "2024-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Total number of snippets favorited by the user",
    example: 42,
  })
  favoriteCount: number;

  // Exclude sensitive fields that might be in the user object
  @Exclude()
  password: string;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  constructor(partial: Partial<UserProfileDto>) {
    Object.assign(this, partial);
  }
}
