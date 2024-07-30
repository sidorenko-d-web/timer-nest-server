
import { MaxLength, IsString, IsIn, IsOptional } from 'class-validator';
import scrambleTypes  from './sessionData'

export class UpdateSessionDto{
  @IsOptional()
  @MaxLength(15, {message: 'name of session should be less than 15 characters'})
	@IsString()
	name: string
}
 