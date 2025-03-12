import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { SnippetsModule } from "./snippets/snippets.module";
import { FeedModule } from "./feed/feed.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { WorksModule } from "./works/works.module";

@Module({
  imports: [
    PassportModule,
    SnippetsModule,
    FeedModule,
    FavoritesModule,
    WorksModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ], // providers or imports?
})
export class AppModule {}
