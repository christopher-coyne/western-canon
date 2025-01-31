import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { SessionSerializer } from './auth/session.serializer';
import { LlmService } from './llm/llm.service';
import { LlmModule } from './llm/llm.module';
import { OpenAiService } from './openai/openAi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule.forRoot({isGlobal: true})], // providers or imports?
  controllers: [AppController, RecommendationsController, AuthController],
  providers: [AppService, PrismaService, RecommendationsService, AuthService, UsersService, LocalStrategy, SessionSerializer, LlmService, OpenAiService],
})
export class AppModule {}
