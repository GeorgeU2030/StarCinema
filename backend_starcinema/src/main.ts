import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(1807) || process.env.PORT;
}
bootstrap();
