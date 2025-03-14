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
import { WorksService } from "./works.service";
import { WorkDto } from "./DTO/response/works.dto";

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
@Controller("/works")
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiResponse({
    type: WorkDto,
    isArray: true,
  })
  @Get("/")
  async getWorks() {
    const { items, total, page, pageSize } = await this.worksService.getWorks(
      1,
      10
    );
    return PaginatedResult.ok(items, total, page, pageSize);
  }
}
