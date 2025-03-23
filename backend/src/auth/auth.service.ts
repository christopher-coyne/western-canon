import { ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    console.log("hashed password, ", hashedPassword);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        email: signUpDto.email,
        name: signUpDto.name,
        password: hashedPassword,
        role: Role.USER,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
