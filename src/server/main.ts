import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize());

  const config = new DocumentBuilder()
    .setTitle('RiseOfCode')
    .setDescription('The RiseOfCode App API description')
    .setVersion('1.0')
    .addTag('class')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views', 'pages'));
  // app.setViewEngine('hbs');

  // app.useGlobalPipes(new ValidationPipe());
  //
  // app.useGlobalFilters(new HttpExceptionFilter());
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(
  //   new PrismaClientExceptionFilter(httpAdapter, {
  //     P2000: HttpStatus.BAD_REQUEST,
  //     P2025: HttpStatus.NOT_FOUND,
  //   }),
  // );

  // hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  Logger.log(`Application is running on: http://localhost:3000`);
  Logger.log(`Swagger is running on: http://localhost:3000/api`);

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
