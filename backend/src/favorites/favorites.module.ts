import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Module({
  imports: [FavoritesService],
  providers: [FavoritesService],
})
export class FavoritesModule {}
