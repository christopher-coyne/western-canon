import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Module({
  imports: [ProjectsService],
  providers: [ProjectsService],
})
export class ProjectsModule {}
