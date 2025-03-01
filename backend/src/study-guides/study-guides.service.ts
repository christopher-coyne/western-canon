import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudyGuideDto } from "./DTO/CreateStudyGuideDto";
import { CreateStudyGuideSectionDto } from "./DTO/CreateStudyGuideSectionDto";

@Injectable()
export class StudyGuidesService {
  constructor(private prismaService: PrismaService) {}

  async getStudyGuides() {
    return await this.prismaService.studyGuide.findMany();
  }

  async getStudyGuideById(id: string) {
    const studyGuide = await this.prismaService.studyGuide.findUnique({
      where: { id },
    });

    if (!studyGuide) {
      throw new NotFoundException();
    }

    return studyGuide;
  }

  async createStudyGuide(data: CreateStudyGuideDto, userId: string) {
    await this.prismaService.studyGuide.create({
      data: { ...data, authorId: userId },
    });

    return true;
  }

  async updateStudyGuide({
    data,
    userId,
    id,
  }: {
    data: CreateStudyGuideDto;
    userId: string;
    id: string;
  }) {
    const studyGuide = await this.prismaService.studyGuide.findUnique({
      where: { id },
    });

    if (studyGuide?.authorId !== userId) {
      throw new NotFoundException();
    }

    await this.prismaService.studyGuide.update({
      where: { id },
      data: { ...data },
    });

    return true;
  }

  async createSectionForStudyGuide({
    data,
    userId,
    studyGuideId,
  }: {
    data: CreateStudyGuideSectionDto;
    userId: string;
    studyGuideId: string;
  }) {
    const studyGuide = await this.prismaService.studyGuide.findUnique({
      where: { id: studyGuideId },
    });

    if (!studyGuide) {
      throw new NotFoundException();
    }

    if (studyGuide.authorId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.section.create({
      data: { ...data, studyGuideId },
    });

    return true;
  }
}
