import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('timer-api')
  app.use(cookieParser())
  app.enableCors({
    origin: ['https://bb-timer.vercel.app/'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })
  await app.listen(5000);
}
bootstrap()


