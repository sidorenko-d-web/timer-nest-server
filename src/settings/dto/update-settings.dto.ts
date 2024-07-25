import { IsBoolean } from 'class-validator'

export class UpdateSettingsDto {
	@IsBoolean()
	isTimeShowed: boolean
}
