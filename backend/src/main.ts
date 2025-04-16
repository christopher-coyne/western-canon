import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Recommendations App")
    .setDescription("API for generating media recommendations using AI")
    .setVersion("1.0")
    .addTag("Api")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // Change to true in production (HTTPS)
        sameSite: "lax", // Adjust for cross-origin requests
      },
    })
  );
  // Initialize Passport and use session
  app.use(passport.initialize());
  app.use(passport.session());
  console.log("FRONTEND_URL", process.env.FRONTEND_URL);

  app.enableCors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL], // Add your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    })
  );

  const port = process.env.PORT ?? 3000;
  console.log("starting app on port ", port);
  await app.listen(port);
}

bootstrap();

/*
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
*/
