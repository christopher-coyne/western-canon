import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, userId?: any) => void): void {
    console.log("SERIALIZING USER:", user);
    done(null, user.id); // Store only user ID
  }

  deserializeUser(userId: any, done: (err: any, user?: any) => void): void {
    console.log("DESERIALIZING USER:", userId);
    // Retrieve user from database or mock
    done(null, {
      id: String(userId),
      username: "james williams",
      email: "james@gmail.com",
    });
  }
}
