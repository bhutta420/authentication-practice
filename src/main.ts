import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  })
  const configService = await app.get(ConfigService)
  const port = configService.get('app.port')
  const url = configService.get('app.url')
  const cors_allow_domains = configService.get('app.cors_allow_domains')
  app.enableCors({
    origin: cors_allow_domains,
  })
  const logger = new Logger('Main')
  logger.log(url)
  await app.listen(port);
}
bootstrap();
