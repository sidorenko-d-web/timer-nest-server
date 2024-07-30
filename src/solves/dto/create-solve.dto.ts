import { PenaltyEnum } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsDate,
	IsDateString,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator'

export class CreateSolveDto {
	@IsString()
	sessionId: string

	@IsString()
	scramble: string

	@Type(() => Date)
	time: Date

	@IsOptional()
	@IsEnum(PenaltyEnum)
	penalty?: PenaltyEnum
}
