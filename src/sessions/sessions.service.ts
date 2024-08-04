import { BadRequestException, Injectable } from '@nestjs/common'
import type { CreateSessionDto } from './dto/create-session.dto'
import type { UpdateSessionDto } from './dto/update-session.dto'
import { PrismaService } from '../prisma.service'
import sessionData from './dto/sessionData'

@Injectable()
export class SessionsService {
	constructor(private prisma: PrismaService) {}

	async createNewSession(createSessionDto: CreateSessionDto, userId: string) {
		const session = await this.prisma.session.findFirst({
			where: { userId, name: createSessionDto.name }
		})
		if (session) throw new BadRequestException('Name should be unique')

		const newSession = { userId, ...createSessionDto }
		return await this.prisma.session.create({ data: newSession })
	}

	generateDefaultSessions() {
		//uses like generator of an array with def sessions
		const defSessionNames = [...sessionData.keys()]
		const defSessionsTypes = [...sessionData.values()]
		const sessions = defSessionNames.map((elem, index) => ({
			name: String(elem),
			scrambleType: String(defSessionsTypes[index])
		}))

		return sessions
	}

	getAllSessionsOfUser(userId: string) {
		return this.prisma.session.findMany({
			orderBy: {
				name: 'asc'
			},
			where: { userId },
		})
	}

	getSessionOfUser(userId: string, sessionName: string) {
		return this.prisma.session.findFirst({
			where: { userId, name: sessionName },
			include: { solves: {
				orderBy: {
					createdAt: 'desc'
				}
			} }
		})
	}

	async update(
		userId: string,
		sessionName: string,
		updateSessionDto: UpdateSessionDto
	) {
		if (sessionName === updateSessionDto.name)
			throw new BadRequestException('It must be another name')
		if (sessionName === '3x3')
			throw new BadRequestException('You must not rename default 3x3 session')
		const session = await this.prisma.session.findFirst({
			where: { userId, name: updateSessionDto.name }
		})

		if (session) throw new BadRequestException('Name should be unique')

		await this.prisma.session.updateMany({
			where: { userId, name: sessionName },
			data: updateSessionDto
		})

		return {
			name: updateSessionDto.name
		}
	}

	async remove(userId: string, sessionName: string) {
		if (sessionName === '3x3')
			throw new BadRequestException('You must not delete default 3x3 session')
		const anotherSession = await this.prisma.session.findFirst({
			where: { userId, name: { not: sessionName } }
		})
		if (!anotherSession)
			throw new BadRequestException('You cannot delete all sessions')

		await this.prisma.session.deleteMany({
			where: { userId, name: sessionName }
		})
		return anotherSession
	}
}
