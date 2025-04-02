import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}
