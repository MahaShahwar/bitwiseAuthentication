import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/app.module';
import ('module-alias/register')

// import ('module-alias/register')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.Port);
}
bootstrap();
