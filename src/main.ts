/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PATCH,POST,DELETE',
    credentials: true
  });

  app.useStaticAssets(join(__dirname, '..', 'invoiceUploads'))

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
