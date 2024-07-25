import { IsIn, IsString, MaxLength } from 'class-validator'
import scrambleTypes  from './sessionData'

export class CreateSessionDto {
  @MaxLength(15, {message: 'name of session should be less than 15 characters'})
	@IsString()
	name: string

	@IsString()
	@IsIn([...scrambleTypes.values()])
	scrambleType: string
}
