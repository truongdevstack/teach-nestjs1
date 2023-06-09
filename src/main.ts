import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
}
bootstrap();
