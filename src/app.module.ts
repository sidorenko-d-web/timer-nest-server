import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { SettingsModule } from './settings/settings.module'
import { SessionsModule } from './sessions/sessions.module'
import { SolvesModule } from './solves/solves.module'

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot(),
		UserModule,
		SettingsModule,
		SessionsModule,
		SolvesModule
	]
})
export class AppModule {}
