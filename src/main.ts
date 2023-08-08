import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Education notes')
    .setDescription('The education notes app API description')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
        description: 'Enter your API key',
      },
      'X-API-KEY',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
