import { PenaltyEnum } from '@prisma/client'
import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateSolveDto {
	@IsString()
	sessionId: string

	@IsString()
	scramble: string

	@IsDateString()
	time: Date

  @IsOptional()
	@IsEnum(PenaltyEnum)
	penalty?: PenaltyEnum

	@IsDateString()
	createdAt: Date
}
