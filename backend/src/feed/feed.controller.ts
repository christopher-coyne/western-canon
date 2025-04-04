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
import { GetFeedDto } from "./DTO/request/get-feed-dto";

@Controller("/feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiResponse({
    type: SnippetDto,
  })
  @Get("/")
  async getFeed(@Query() query: GetFeedDto, @Req() request) {
    const userId = request.user?.id;
    const items = await this.feedService.getFeed(query, userId);
    return Result.ok(items);
  }
}
