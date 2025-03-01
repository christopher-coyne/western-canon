import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService) { }

    async getFavoriteProjects(userId: string) {
        const favoriteProjects = await this.prismaService.projectFavorite.findMany({
            where: {userId},
            include: {project: true}
        })
       return favoriteProjects
    }

    async favoriteProject(userId: string, projectId:string) {
        const project = await this.prismaService.project.findUnique({
            where: {id: projectId}
        })

        if (!project) {
            throw new NotFoundException()
        }

        await this.prismaService.projectFavorite.create({
            data: {userId, projectId: projectId}
        })
        return true
    }

    async unfavoriteProject(userId: string, projectId:string) {
        const favoriteProject = await this.prismaService.projectFavorite.findUnique({
            where: {userId_projectId: {projectId: projectId, userId: userId}}
        })

        if (!favoriteProject) {
            throw new NotFoundException()
        }

        await this.prismaService.projectFavorite.delete({
            where: {id: favoriteProject.id}
        })
        return true
    }

    async getFavoriteQuestions(userId: string) {
        const favoriteQuestions = await this.prismaService.questionFavorite.findMany({
            where: {userId},
            include: {question: true}
        })
       return favoriteQuestions
    }

    async favoriteQuestion(userId: string, questionId:string) {
        const question = await this.prismaService.question.findUnique({
            where: {id: questionId}
        })

        if (!question) {
            throw new NotFoundException()
        }

        await this.prismaService.questionFavorite.create({
            data: {userId, questionId: questionId}
        })
        return true
    }

    async unfavoriteQuestion(userId: string, questionId:string) {
        const favoriteQuestion = await this.prismaService.questionFavorite.findUnique({
            where: {userId_questionId: {questionId: questionId, userId: userId}}
        })

        if (!favoriteQuestion) {
            throw new NotFoundException()
        }

        await this.prismaService.questionFavorite.delete({
            where: {id: favoriteQuestion.id}
        })
        return true
    }

    async getFavoriteStudyGuides(userId: string) {
        const favoriteStudyGuides = await this.prismaService.studyGuideFavorite.findMany({
            where: {userId}
        })
       return favoriteStudyGuides
    }

    async favoriteStudyGuide(userId: string, studyGuideId:string) {
        const studyGuide = await this.prismaService.studyGuide.findUnique({
            where: {id: studyGuideId}
        })

        if (!studyGuide) {
            throw new NotFoundException()
        }

        await this.prismaService.studyGuideFavorite.create({
            data: {userId, studyGuideId}
        })
        return true
    }

    async unfavoriteStudyGuide(userId: string, studyGuideId:string) {
        const favoriteStudyGuide = await this.prismaService.studyGuideFavorite.findUnique({
            where: {userId_studyGuideId: {studyGuideId: studyGuideId, userId: userId}}
        })

        if (!favoriteStudyGuide) {
            throw new NotFoundException()
        }

        await this.prismaService.studyGuideFavorite.delete({
            where: {id: favoriteStudyGuide.id}
        })
        return true
    }
}