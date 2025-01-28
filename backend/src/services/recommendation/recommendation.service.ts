import { Injectable } from "@nestjs/common";
import { MediaType, MusicRecommendation, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

/*
  id          Int       @id @default(autoincrement())
  mediaType   MediaType
  description String
  prompt      String
  */
@Injectable()
export class RecommendationService {
    constructor(private prisma: PrismaService) { }

    async createRecommendation(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): MusicRecommendation {
        console.log('hey...')
        const newRec = this.prisma.musicRecommendation.create({ data: { mediaType: MediaType.MUSIC, description: 'test', prompt: 'test' } })
        return newRec
    }
}