import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('timer-api')
	app.enableCors({
		origin: [
			'http://127.0.0.1:3000/',
			'http://127.0.0.1:3000',
			'http://localhost:3000/',
			'http://localhost:3000',
			'http://192.168.31.223:3000/',
			'http://192.168.31.223:3000',
			'https://bb-timer.vercel.app/'
		],
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		credentials: true
	})
	app.use(cookieParser('localhost'))
	await app.listen(5000)
}
bootstrap()
