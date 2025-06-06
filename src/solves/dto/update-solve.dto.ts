import { PenaltyEnum } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateSolveDto{
  @IsOptional()
  @IsEnum(PenaltyEnum)
  penalty: PenaltyEnum 
}
