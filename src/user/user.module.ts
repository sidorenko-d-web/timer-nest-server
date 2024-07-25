import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SettingsService } from 'src/settings/settings.service'
import { ConfigService } from '@nestjs/config'
import { SessionsService } from 'src/sessions/sessions.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, SettingsService, ConfigService, SessionsService],
	exports: [UserService]
})
export class UserModule {}
