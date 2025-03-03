import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { ProjectsModule } from "./projects/projects.module";

@Module({
  imports: [
    PassportModule,
    ProjectsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ], // providers or imports?
})
export class AppModule {}
