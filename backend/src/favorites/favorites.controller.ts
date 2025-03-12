import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Result } from "src/domain/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { ApiResponse } from "@nestjs/swagger";
import { PaginatedResult } from "src/common/DTO/Pagination.dto";
import { SnippetDto } from "src/snippets/DTO/response/snippet.dto";
import { FavoritesService } from "./favorites.service";
import { LocalAuthGuard } from "src/auth/localAuthenticated.guard";

@Controller("/favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiResponse({
    type: SnippetDto,
    isArray: true,
  })
  @UseGuards(AuthenticatedGuard)
  @Get("/")
  async getFeed(@Req() request) {
    const user = request.user;
    console.log("user ", user);

    const { items, total, page, pageSize } =
      await this.favoritesService.getFavoriteSnippets(user, 1, 10);
    return PaginatedResult.ok(items, total, page, pageSize);
  }
}
