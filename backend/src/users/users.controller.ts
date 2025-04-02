import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { UsersService } from "./users.service";
import { UserProfileDto } from "./DTO/user-profile.dto";
import { Result } from "src/common/DTO/result";
import { UpdateCursorDto } from "./DTO/requests/update-cursor.dto";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    description: "Get user profile with favorite count",
    type: UserProfileDto,
  })
  @UseGuards(AuthenticatedGuard)
  @Get("/profile")
  async getProfile(@Req() request) {
    const userId = request.user.id;
    const profile = await this.usersService.getProfile(userId);
    return Result.ok(profile);
  }

  @ApiResponse({
    description: "Update user cursor",
    type: UpdateCursorDto,
  })
  @UseGuards(AuthenticatedGuard)
  @Patch("/cursor")
  async updateCursor(@Req() request, @Body() updateCursorDto: UpdateCursorDto) {
    console.log("updateCursorDto controller ", updateCursorDto);
    const userId = request.user.id;
    const updatedCursor = await this.usersService.updateCursor(
      userId,
      updateCursorDto
    );
    return Result.ok(updatedCursor);
  }
}
