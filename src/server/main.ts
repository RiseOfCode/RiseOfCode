import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize());

  const config = new DocumentBuilder()
    .setTitle('RiseOfCode')
    .setDescription('The RiseOfCode App API description')
    .setVersion('1.0')
    .addTag('class')
    .addTag('progress')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  Logger.log(`Application is running on: http://localhost:3000`);
  Logger.log(`Swagger is running on: http://localhost:3000/api`);

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
