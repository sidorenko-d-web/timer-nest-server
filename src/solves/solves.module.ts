import { Module } from '@nestjs/common';
import { SolvesService } from './solves.service';
import { SolvesController } from './solves.controller';

@Module({
  controllers: [SolvesController],
  providers: [SolvesService],
})
export class SolvesModule {}
