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
import { Result } from "src/common/DTO/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { ApiResponse } from "@nestjs/swagger";
import { PaginatedResult } from "src/common/DTO/Pagination.dto";
import { SnippetDto } from "src/snippets/DTO/response/snippet.dto";
import { FeedService } from "./feed.service";

@Controller("/feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiResponse({
    type: SnippetDto,
    isArray: true,
  })
  @Get("/")
  async getFeed() {
    const { items, total, page, pageSize } = await this.feedService.getFeed(
      1,
      10
    );
    return PaginatedResult.ok(items, total, page, pageSize);
  }
}
