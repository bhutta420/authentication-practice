import { VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsAllowedDomainService } from './cors-allowed-domain/services';
import * as _ from 'lodash'
import { customeValidationPipe } from '@app/core';
import { FileLogger } from '@app/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  // app.useGlobalPipes(
  //   customeValidationPipe
  // );
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });
  const corsAllowedDomainService = await app.get(CorsAllowedDomainService)
  const configService = await app.get(ConfigService)
  const levels = configService.get('logger.levels')
  // const file_size = configService.get('logger.file_size')
  const file_logger = new FileLogger()
  file_logger.setLogLevels(levels)
  app.useLogger(file_logger)
  const cors_records = await corsAllowedDomainService.list()
  const urls = await cors_records?.map?.(i=>i.url) ?? []
  const cors_origin = configService.get('app.cors')
  const new_cors_origins = _.uniq([...cors_origin,...urls])
  const logger = new Logger('MAIN')
  logger.log(new_cors_origins)
  app.enableCors({
    origin: new_cors_origins.length ? new_cors_origins : '*',
  })
  const port = configService.get('app.port')
  const url = configService.get('app.url')
  logger.log(url)
  await app.listen(port);
}
bootstrap();
