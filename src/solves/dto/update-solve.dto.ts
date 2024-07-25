import { PartialType } from '@nestjs/mapped-types';
import { CreateSolveDto } from './create-solve.dto';

export class UpdateSolveDto extends PartialType(CreateSolveDto) {}
