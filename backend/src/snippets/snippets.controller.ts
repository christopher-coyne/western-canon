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
import { SnippetDto } from "./DTO/response/snippet.dto";
import { SnippetsService } from "./snippets.service";
import { GetSnippetsDto } from "./DTO/request/get-snippets.dto";

/*
    id        String     @id @default(uuid())
  content   String     @db.Text
  analysis  String?    @db.Text
  workId    String

  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  deletedAt DateTime?
  
  work      Work       @relation(fields: [workId], references: [id])
  favorites Favorite[]
  */
@Controller("/snippets")
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @ApiResponse({
    type: SnippetDto,
    isArray: true,
  })
  @Get("/")
  async getSnippets(@Query() query: GetSnippetsDto) {
    console.log("total query", query);
    const { items, total, page, pageSize } =
      await this.snippetsService.getSnippets(
        query.page,
        query.pageSize,
        query.query
      );
    return PaginatedResult.ok(items, total, page, pageSize);
  }
}
