import { Module } from "@nestjs/common";
import { SnippetsService } from "./snippets.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SnippetsController } from "./snippets.controller";

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService, PrismaService],
})
export class SnippetsModule {}
