import { Injectable } from '@nestjs/common'
import type { CreateSessionDto } from './dto/create-session.dto'
import type { UpdateSessionDto } from './dto/update-session.dto'
import { PrismaService } from 'src/prisma.service'
import { Session } from '@prisma/client'
import sessionData from './dto/sessionData'

@Injectable()
export class SessionsService {
	constructor(private prisma: PrismaService) {}

	createNewSession(createSessionDto: CreateSessionDto, userId: string) {
		const session = { userId, ...createSessionDto }
		return this.prisma.session.create({ data: session })
	}

	generateDefaultSessions() { //uses like generator of an array of def sessions
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
			where: { userId }
		})
	}

	getSessionOfUser(sessionId: string) {
		return this.prisma.session.findUnique({
			where: { id: sessionId },
			include: { solves: true }
		})
	}

	update(sessionId: string, updateSessionDto: UpdateSessionDto) {
		return this.prisma.session.update({
			where: { id: sessionId },
			data: updateSessionDto
		})
	}

	remove(id: string) {
		return this.prisma.session.delete({
			where: { id }
		})
	}
}
