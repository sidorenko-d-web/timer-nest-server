import { PenaltyEnum } from "@prisma/client"
import { IsDate, IsEnum, IsString } from "class-validator"

export class CreateSolveDto {
  @IsString()
  scramble: string

  @IsDate()
  time: Date

  @IsEnum(PenaltyEnum)
  penalty: PenaltyEnum

  @IsDate()
  createdAt: Date
}
