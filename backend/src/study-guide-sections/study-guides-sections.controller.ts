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
import { StudyGuidesSectionsService } from "./study-guides-sections.service";
import { CreateStudyGuideQuestionDto } from "./DTO/CreateStudyGuideQuestionDto";

@Controller("/study-guides-sections")
export class StudyGuidesController {
  constructor(
    private readonly studyGuidesSectionsService: StudyGuidesSectionsService
  ) {}

  @Get("/:id/questions")
  async getQuestions(@Param("id") id: string) {
    return Result.ok(await this.studyGuidesSectionsService.getQuestions(id));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/:id/question")
  async createQuestion(
    @Req() req,
    @Param("id") id: string,
    @Body() body: CreateStudyGuideQuestionDto
  ) {
    const userId = req.user.id;
    return Result.ok(
      await this.studyGuidesSectionsService.createQuestion({
        data: body,
        sectionId: id,
        userId: id,
      })
    );
  }
}
