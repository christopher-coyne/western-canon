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
import { ProjectsService } from "./projects.service";
import { Result } from "src/domain/result";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateProjectDto } from "./DTO/CreateProjectDto";
import { ApiResponse } from "@nestjs/swagger";
import { ProjectEntity } from "./projects.entity";
import { GetProjectsDto } from "./DTO/GetProjectsDto";

@Controller("/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({
    type: ProjectEntity,
    isArray: true,
  })
  @Get("/")
  async getProjects(@Query() data: GetProjectsDto) {
    return Result.ok(await this.projectsService.getProjects(data));
  }

  @Get("/:id")
  async getProjectById(@Param() param: string) {
    return Result.ok(await this.projectsService.getProjectById(param));
  }

  @Delete("/:id")
  async deleteProject(@Req() req, @Param() param: string) {
    const userId = req.user.id;
    return Result.ok(
      await this.projectsService.deleteProjectById(userId, param)
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/")
  async createProject(
    @Req() req,
    @Body() body: CreateProjectDto
  ): Promise<Result<string>> {
    const userId = req.user.id;
    return Result.ok(await this.projectsService.createProject(userId, body));
  }

  @UseGuards(AuthenticatedGuard)
  @Post("/:id")
  async updateProject(
    @Req() req,
    @Body() body: CreateProjectDto,
    @Param() param: string
  ): Promise<Result<string>> {
    const userId = req.user.id;
    return Result.ok(
      await this.projectsService.updateProject({
        userId,
        data: body,
        projectId: param,
      })
    );
  }
}
