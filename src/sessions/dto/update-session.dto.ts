
import { MaxLength, IsString, IsIn, IsOptional } from 'class-validator';
import scrambleTypes  from './sessionData'

export class UpdateSessionDto{
  @IsOptional()
  @MaxLength(12, {message: 'name of session should be less than 12 characters'})
	@IsString()
	name: string
}
 