import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { SolvesService } from './solves.service';
import { CreateSolveDto } from './dto/create-solve.dto';
import { UpdateSolveDto } from './dto/update-solve.dto';
import { Auth } from 'src/auth/decoradors/auth.decorator';

@Controller('solves')
export class SolvesController {
  constructor(private readonly solvesService: SolvesService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  @Auth()
  create(@Body() createSolveDto: CreateSolveDto) {
    return this.solvesService.create(createSolveDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.solvesService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateSolveDto: UpdateSolveDto) {
    return this.solvesService.update(id, updateSolveDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.solvesService.remove(id);
  }
}
