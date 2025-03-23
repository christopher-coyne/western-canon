import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class SignUpDto {
  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please enter a valid email address" })
  email: string;

  @ApiProperty({
    description: "User's display name",
    example: "John Doe",
  })
  @IsString()
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name: string;

  @ApiProperty({
    description: "User's password",
    example: "StrongP@ss123",
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;
}
