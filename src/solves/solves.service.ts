import { Injectable } from '@nestjs/common';
import { CreateSolveDto } from './dto/create-solve.dto';
import { UpdateSolveDto } from './dto/update-solve.dto';

@Injectable()
export class SolvesService {
  create(createSolveDto: CreateSolveDto) {
    return 'This action adds a new solve';
  }


  findOne(id: number) {
    return `This action returns a #${id} solve`;
  }

  update(id: number, updateSolveDto: UpdateSolveDto) {
    return `This action updates a #${id} solve`;
  }

  remove(id: number) {
    return `This action removes a #${id} solve`;
  }
}
