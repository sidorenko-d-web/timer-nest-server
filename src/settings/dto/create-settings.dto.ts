import { IsString } from 'class-validator'

export class CreateSettingsDto {
	@IsString()
	userId: string
}
