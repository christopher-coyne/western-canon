import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Result } from "src/domain/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateStudyGuideDto } from "./DTO/CreateStudyGuideDto";
import { StudyGuidesService } from "./study-guides.service";
import { CreateStudyGuideSectionDto } from "./DTO/CreateStudyGuideSectionDto";

@Controller("/study-guides")
export class StudyGuidesController {
  constructor(private readonly studyGuidesService: StudyGuidesService) {}

  @Get("/")
  async getStudyGuides() {
    return Result.ok(await this.studyGuidesService.getStudyGuides());
  }

  @Get("/:id")
  async getStudyGuide(@Param("id") id: string) {
    return Result.ok(await this.studyGuidesService.getStudyGuideById(id));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/")
  async createStudyGuide(@Req() req, @Body() body: CreateStudyGuideDto) {
    const userId = req.user.id;
    return Result.ok(
      await this.studyGuidesService.createStudyGuide(body, userId)
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Put("/:id")
  async updateStudyGuide(
    @Req() req,
    @Param("id") id: string,
    @Body() body: CreateStudyGuideDto
  ) {
    const userId = req.user.id;
    return Result.ok(
      await this.studyGuidesService.updateStudyGuide({ userId, data: body, id })
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/:id/sections")
  async createSectionForStudyGuide(
    @Req() req,
    @Param("id") id: string,
    @Body() body: CreateStudyGuideSectionDto
  ) {
    const userId = req.user.id;
    return Result.ok(
      await this.studyGuidesService.createSectionForStudyGuide({
        userId,
        data: body,
        studyGuideId: id,
      })
    );
  }
}
