import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

const port = process.env.PORT || 4000;
console.log(`app is running on port${port}`);
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`${__dirname}/../https/localhost-privkey.pem`),
    cert: fs.readFileSync(`${__dirname}/../https//localhost-cert.pem`),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters();
  app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(port);
}
bootstrap();
