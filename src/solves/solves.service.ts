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

	async update(solveId: string, updateSolveDto: UpdateSolveDto) {
		console.log(updateSolveDto)
		const res =  await this.prisma.solve.update({where: {id: solveId}, data: updateSolveDto})
		console.log(await this.prisma.solve.findUnique({where: {id: solveId}}))
		return res
	}

	remove(solveId: string) {
		return this.prisma.solve.delete({where: {id: solveId}})
	}
}
