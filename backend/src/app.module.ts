import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { SnippetsModule } from "./snippets/snippets.module";

@Module({
  imports: [
    PassportModule,
    SnippetsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ], // providers or imports?
})
export class AppModule {}
