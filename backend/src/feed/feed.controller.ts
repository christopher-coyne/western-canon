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
import {
  PaginatedResult,
  PaginationQueryDto,
} from "src/common/DTO/Pagination.dto";
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
  async getFeed(@Query() start: number, @Req() request) {
    const userId = request.user?.id;
    console.log("start ", start);
    const { items, total, page, pageSize } = await this.feedService.getFeed(
      userId,
      start
    );
    return PaginatedResult.ok(items, total, page, pageSize);
  }
}
