import { IsString } from 'class-validator'

export class UpdateUserNickDto {
	@IsString()
	newNick: string
}
