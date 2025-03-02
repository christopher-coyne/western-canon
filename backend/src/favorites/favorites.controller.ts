import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Result } from "src/domain/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { FavoritesService } from "./favorites.service";

@Controller("/favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get("/projects")
  async getFavoriteProjects(@Req() req) {
    const userId = req.user.id;
    return Result.ok(await this.favoritesService.getFavoriteProjects(userId));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/projects/:id")
  async favoriteProject(@Req() req, @Param() projectId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.favoriteProject(userId, projectId)
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete("/projects/:id")
  async unfavoriteProject(@Req() req, @Param() projectId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.unfavoriteProject(userId, projectId)
    );
  }

  @Get("/questions")
  async getFavoriteQuestions(@Req() req) {
    const userId = req.user.id;
    return Result.ok(await this.favoritesService.getFavoriteProjects(userId));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/questions/:id")
  async favoriteQuestion(@Req() req, @Param() questionId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.favoriteQuestion(userId, questionId)
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete("/questions/:id")
  async unfavoriteQuestion(@Req() req, @Param() questionId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.unfavoriteQuestion(userId, questionId)
    );
  }

  @Get("/study-guides")
  async getFavoriteStudyGuides(@Req() req) {
    const userId = req.user.id;
    return Result.ok(await this.favoritesService.getFavoriteProjects(userId));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/study-guides/:id")
  async favoriteStudyGuide(@Req() req, @Param() studyGuideId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.favoriteQuestion(userId, studyGuideId)
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete("/study-guides/:id")
  async unfavoriteStudyGuide(@Req() req, @Param() studyGuideId) {
    const userId = req.user.id;
    return Result.ok(
      await this.favoritesService.unfavoriteQuestion(userId, studyGuideId)
    );
  }
}
