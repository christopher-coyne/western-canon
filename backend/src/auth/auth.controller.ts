import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticatedGuard } from "./authenticated.guard";
import { LocalAuthGuard } from "./localAuthenticated.guard";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    return { message: "User registered successfully", user };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return new Promise((resolve, reject) => {
      req.login(req.user, (err) => {
        if (err) {
          console.error("LOGIN ERROR:", err);
          return reject(new InternalServerErrorException("Login failed"));
        }
        resolve({ message: "Logged in successfully", user: req.user });
      });
    });
  }

  @ApiOperation({ summary: "Log out the current user" })
  @ApiResponse({
    status: 200,
    description: "User successfully logged out",
  })
  @UseGuards(AuthenticatedGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          console.error("LOGOUT ERROR:", err);
          return reject(new InternalServerErrorException("Logout failed"));
        }
        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            console.error("SESSION DESTRUCTION ERROR:", sessionErr);
            return reject(
              new InternalServerErrorException("Session destruction failed")
            );
          }
          resolve({ message: "Logged out successfully" });
        });
      });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get("profile")
  profile(@Request() req) {
    console.log("req. user  ", req.user);
    console.log("req. session  ", req.session);
    return req.user;
  }
}
