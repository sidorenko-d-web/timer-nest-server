import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolvesService } from './solves.service';
import { CreateSolveDto } from './dto/create-solve.dto';
import { UpdateSolveDto } from './dto/update-solve.dto';

@Controller('solves')
export class SolvesController {
  constructor(private readonly solvesService: SolvesService) {}

  @Post()
  create(@Body() createSolveDto: CreateSolveDto) {
    return this.solvesService.create(createSolveDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solvesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolveDto: UpdateSolveDto) {
    return this.solvesService.update(+id, updateSolveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solvesService.remove(+id);
  }
}
