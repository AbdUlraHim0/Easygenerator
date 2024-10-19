import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ResponseInterceptor } from 'common/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
