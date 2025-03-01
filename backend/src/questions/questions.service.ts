import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateQuestionDto } from "./DTO/CreateQuestionDto";

@Injectable()
export class QuestionsService {
    constructor(private prismaService: PrismaService) { }

    async getQuestions() {
       return await this.prismaService.question.findMany()
    }

    async getQuestionById(id: string) {
        const question = await this.prismaService.question.findUnique({where: {id}})

        if (!question) {
            throw new NotFoundException()
        }

        return question
    }

    async createQuestion(data: CreateQuestionDto, userId: string) {
        const studyGuide = await this.prismaService.studyGuide.findUnique({
            where: {id: data.studyGuideId}
        })

        if (!studyGuide) {
            throw new NotFoundException()
        }

        if (studyGuide.authorId !== userId) {
            throw new UnauthorizedException()
        }

        await this.prismaService.question.create({
            data
        })

        return true
    }

    async updateQuestion({id, data, userId}: {id: string, data: CreateQuestionDto, userId: string}) {
        const studyGuide = await this.prismaService.studyGuide.findUnique({
            where: {id: data.studyGuideId}
        })

        if (!studyGuide) {
            throw new NotFoundException()
        }

        if (studyGuide.authorId !== userId) {
            throw new UnauthorizedException()
        }

        await this.prismaService.question.update({
            where: {id},
            data
        })

        return true
    }

}