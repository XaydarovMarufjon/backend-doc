import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(json()); 
  app.use(urlencoded({ extended: true }))
  app.enableCors({
    // origin: [ 'https://document-registry.vercel.app', 'http://localhost:4200' ], 
    origin: [
      'http://localhost:4200',
      'https://document-registry.vercel.app',
      'https://backend-doc-eight.vercel.app'
    ],
    methods: 'GET,POST,PUT,DELETE,HEAD,PATCH', 
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true
  });
   app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
