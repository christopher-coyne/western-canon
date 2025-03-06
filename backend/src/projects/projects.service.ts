import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectDto } from "./DTO/CreateProjectDto";
import { GetProjectsDto } from "./DTO/GetProjectsDto";
import { PaginatedResult } from "src/common/DTO/Pagination.dto";
import { ProjectEntity } from "./projects.entity";

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async getProjects(data: GetProjectsDto) {
    const { page, query, difficulties, tags } = data;
    console.log("page ", page);
    const pageSize = 12;
    const skip = (page - 1) * pageSize;

    // Build where conditions
    const where: any = {};

    // Add search query condition
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    // Add difficulty filter
    if (difficulties?.length) {
      where.difficulty = { in: difficulties };
    }

    // Add tags filter
    if (tags?.length) {
      where.tags = {
        some: {
          id: { in: tags },
        },
      };
    }

    // Get total count for pagination
    const total = await this.prismaService.project.count({ where });

    // Get results with pagination
    const items = await this.prismaService.project.findMany({
      where,
      include: {
        creator: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });

    return { items, total, page, pageSize };
  }

  async getProjectById(id: string) {
    return await this.prismaService.project.findUnique({
      where: { id },
      include: { creator: true },
    });
  }

  async deleteProjectById(userId: string, id: string) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException();
    }

    if (userId !== project.creatorId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.project.delete({ where: { id } });
    return true;
  }

  async createProject(userId: string, data: CreateProjectDto) {
    const createdProject = await this.prismaService.project.create({
      data: {
        creatorId: userId,
        ...data,
      },
    });

    return createdProject.id;
  }

  async updateProject({
    userId,
    data,
    projectId,
  }: {
    projectId: string;
    data: CreateProjectDto;
    userId: string;
  }) {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException();
    }

    if (project.creatorId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.project.update({
      where: { id: projectId },
      data: { ...data },
    });

    return project.id;
  }
}
