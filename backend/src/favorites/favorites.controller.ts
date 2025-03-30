import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Result } from "src/common/DTO/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { ApiResponse } from "@nestjs/swagger";
import { PaginatedResult } from "src/common/DTO/Pagination.dto";
import { SnippetDto } from "src/snippets/DTO/response/snippet.dto";
import { FavoritesService } from "./favorites.service";
import { LocalAuthGuard } from "src/auth/localAuthenticated.guard";
import { FavoriteSnippetDto } from "./DTO/response/favorite-snippet";

@Controller("/favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiResponse({
    type: FavoriteSnippetDto,
    isArray: true,
  })
  @UseGuards(AuthenticatedGuard)
  @Get("/")
  async getFavoriteSnippets(@Req() request) {
    const user = request.user;
    console.log("user ", user);

    const { items, total, page, pageSize } =
      await this.favoritesService.getFavoriteSnippets(user.id, 1, 10);
    return PaginatedResult.ok(items, total, page, pageSize);
  }

  @UseGuards(AuthenticatedGuard)
  @Put("/snippets/:id")
  async toggleFavoriteSnippet(@Req() request, @Param("id") snippetId: string) {
    const userId = request.user.id;
    const result = await this.favoritesService.toggleFavoriteSnippet(
      userId,
      snippetId
    );
    return Result.ok(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/snippets/:id")
  async favoriteSnippet(@Req() request, @Param("id") snippetId: string) {
    const userId = request.user.id;
    const result = await this.favoritesService.favoriteSnippet(
      userId,
      snippetId
    );
    return Result.ok(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete("/snippets/:id")
  async unfavoriteSnippet(@Req() request, @Param("id") snippetId: string) {
    const userId = request.user.id;
    const result = await this.favoritesService.unfavoriteSnippet(
      userId,
      snippetId
    );
    return Result.ok(result);
  }
}
