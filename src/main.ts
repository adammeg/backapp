import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const port = 5000
async function bootstrap() {
  const app = await NestFactory.create(
  AppModule,
  new ExpressAdapter(express()),
);
app.enableCors({
  origin: 'http://localhost:3000', // Allow requests from this domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies
});
await app.listen(port);
console.log('app is runing on:',port)
}
bootstrap();