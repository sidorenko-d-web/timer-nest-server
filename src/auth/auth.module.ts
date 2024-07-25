import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from 'src/user/user.service'

@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
