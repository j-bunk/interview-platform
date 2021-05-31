import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Internview')
    .setDescription(
      'Welcome! Sign up, then sign in, copy the access token from the sign in response, then add it to the APIs by clicking on the authorize button',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
