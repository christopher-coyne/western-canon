import {
  Controller,
  Request,
  Post,
  UseGuards,
  Param,
  Get,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticatedGuard } from "./authenticated.guard";
import { LocalAuthGuard } from "./localAuthenticated.guard";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return new Promise((resolve, reject) => {
      req.login(req.user, (err) => {
        if (err) {
          console.error("LOGIN ERROR:", err);
          return reject(err);
        }
        resolve({ message: "Logged in", user: req.user });
      });
      return req.user;
    });
  }

  @Get("logout")
  logout(@Request() req) {
    req.logout((err) => {
      if (err) {
        throw err;
      }
    });
    return { message: "Logged out" };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("profile")
  profile(@Request() req) {
    console.log("req. user  ", req.user);
    console.log("req. session  ", req.session);
    return req.user;
  }
}
