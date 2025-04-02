import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";

export class UserDto {
  @ApiProperty({ description: "Unique user identifier" })
  id: string;

  @ApiProperty({ description: "User email address" })
  email: string;

  @ApiPropertyOptional({ description: "User display name" })
  name: string;

  @ApiPropertyOptional({ description: "User cursor" })
  cursor: number;

  @ApiProperty({ description: "User role", enum: Role, default: Role.USER })
  role: Role;

  @ApiProperty({ description: "User creation timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "User last update timestamp" })
  updatedAt: Date;
}
