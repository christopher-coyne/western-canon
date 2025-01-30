import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationsController } from './controllers/recommendations/recommendations.controller';
import { RecommendationService } from './services/recommendation/recommendation.service';
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
  providers: [AppService, PrismaService, RecommendationService, AuthService, UsersService, LocalStrategy, SessionSerializer],
})
export class AppModule {}
