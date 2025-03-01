import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectDto } from "./DTO/CreateProjectDto";

@Injectable()
export class ProjectsService {
    constructor(private prismaService: PrismaService) { }

    async getProjects() {
       return await this.prismaService.project.findMany({include: {creator: true}})
    }

    async getProjectById(id: string) {
        return await this.prismaService.project.findUnique({where: {id }, include: {creator: true}})
     }

     async deleteProjectById(userId: string, id: string) {
        const project = await this.prismaService.project.findUnique({where: {id}})

        if (!project) {
            throw new NotFoundException()
        }

        if (userId !== project.creatorId) {
            throw new UnauthorizedException()
        }
        
        await this.prismaService.project.delete({where: {id}})
        return true
     }

    async createProject(userId: string, data: CreateProjectDto) {
        const createdProject = await this.prismaService.project.create({
            data: {
                creatorId: userId,
                ...data
            }
        })

        return createdProject.id
    }



    async updateProject({userId, data, projectId}: {projectId: string, data: CreateProjectDto, userId: string}) {
        const project = await this.prismaService.project.findUnique({
            where: {id: projectId}
        })

        if (!project) {
            throw new NotFoundException()
        }

        if (project.creatorId !== userId) {
            throw new UnauthorizedException()
        }

        await this.prismaService.project.update({
            where: {id: projectId},
            data: {...data}
        })

        return project.id
    }

}