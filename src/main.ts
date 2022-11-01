import { AppModule } from '@root/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.Port);
}
bootstrap();
