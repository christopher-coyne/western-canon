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
  /*
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Param('password') password: string, @Param('username') username: string) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
    */
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

    /*
  console.log('Full session:', req.session);
  console.log('Passport session:', req.session.passport);
  console.log('User:', req.user);
 return req.user
 */
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
