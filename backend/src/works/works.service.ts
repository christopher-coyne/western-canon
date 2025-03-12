import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class WorksService {
  constructor(private prismaService: PrismaService) {}

  async getWorks(page = 1, pageSize = 10) {
    const [items, total] = await Promise.all([
      this.prismaService.work.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prismaService.work.count(),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }
}
