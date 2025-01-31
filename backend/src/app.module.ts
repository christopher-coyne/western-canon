import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { SessionSerializer } from './auth/session.serializer';

@Module({
  imports: [PassportModule],
  controllers: [AppController, RecommendationsController, AuthController],
  providers: [AppService, PrismaService, RecommendationsService, AuthService, UsersService, LocalStrategy, SessionSerializer],
})
export class AppModule {}
