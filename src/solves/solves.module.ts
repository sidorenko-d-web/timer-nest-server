import { Module } from '@nestjs/common';
import { SolvesService } from './solves.service';
import { SolvesController } from './solves.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SolvesController],
  providers: [SolvesService, PrismaService],
  exports: [SolvesService]
})
export class SolvesModule {}
