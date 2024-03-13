import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // middleware
  app.enableCors(
    {
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true, // Cho phép gửi cookie qua CORS
      allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    }
  )

  await app.listen(3005);
  console.log("Running...");
  
}
bootstrap();
