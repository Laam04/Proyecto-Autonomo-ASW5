import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/graphic', serveStatic(join(__dirname, '..', 'graphic')));

  await app.listen(3002);
}
bootstrap();
