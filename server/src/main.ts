import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { ResponseInterceptor } from 'common/common';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: process.env.CLIENT_URL,
  });

  setupPlugins(app);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;

  app
    .get(Logger)
    .log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

function setupPlugins(app: INestApplication) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  app.use(
    helmet({
      contentSecurityPolicy: isDevelopment ? false : undefined,
      hsts: isDevelopment
        ? false
        : { maxAge: 31536000, includeSubDomains: true, preload: true },
      xContentTypeOptions: true,
      dnsPrefetchControl: { allow: false },
      frameguard: { action: 'deny' },
      permittedCrossDomainPolicies: { permittedPolicies: 'none' },
      referrerPolicy: { policy: 'no-referrer' },
      xssFilter: true,
      hidePoweredBy: true,
    }),
  );
}

bootstrap();
