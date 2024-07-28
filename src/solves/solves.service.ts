import { Injectable } from '@nestjs/common'
import { CreateSolveDto } from './dto/create-solve.dto'
import { UpdateSolveDto } from './dto/update-solve.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SolvesService {
	constructor(private prisma: PrismaService) {}
	create(createSolveDto: CreateSolveDto) {
		return this.prisma.solve.create({ data: createSolveDto })
	}

	findOne(solveId: string) {
		return this.prisma.solve.findFirst({ where: { id: solveId } })
	}

	update(solveId: string, updateSolveDto: UpdateSolveDto) {
		return this.prisma.solve.update({where: {id: solveId}, data: updateSolveDto})
	}

	remove(solveId: string) {
		return this.prisma.solve.delete({where: {id: solveId}})
	}
}
