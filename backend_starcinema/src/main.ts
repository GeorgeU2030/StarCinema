import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000) || process.env.PORT;
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    methods: [ "GET", "POST", "PUT", "DELETE","OPTIONS", "PATCH"],
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
 });
}
bootstrap();
