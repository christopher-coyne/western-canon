import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }

  serializeUser(user: any, done: (err: any, userId?: any) => void): void {
    console.log("SERIALIZING USER:", user);
    done(null, user.id); // Store only user ID
  }

  async deserializeUser(
    userId: string,
    done: (err: any, user?: any) => void
  ): Promise<void> {
    console.log("DESERIALIZING USER:", userId);
    try {
      // Retrieve user from database
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        return done(new Error("User not found"));
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
