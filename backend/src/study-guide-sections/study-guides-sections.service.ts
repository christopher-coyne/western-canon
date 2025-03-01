import { Injectable, NotFoundException, Param, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudyGuideQuestionDto } from "./DTO/CreateStudyGuideQuestionDto";

@Injectable()
export class StudyGuidesSectionsService {
    constructor(private prismaService: PrismaService) { }

    async getQuestions(sectionId: string) {
       return await this.prismaService.question.findMany({where: {sectionId}})
    }

    async createQuestion({sectionId, userId, data}: {sectionId: string, userId: string, data: CreateStudyGuideQuestionDto}) {
        const section = await this.prismaService.section.findUnique({
            where: {id: sectionId},
            include: {studyGuide: true}
        })

        if (!section) {
            throw new NotFoundException()
        }

        if (section.studyGuide.authorId !== userId) {
            throw new UnauthorizedException()
        }

        await this.prismaService.question.create({
            data: {sectionId, ...data}
        })

        return true
     }

}