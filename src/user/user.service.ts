import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'
import { hash } from 'argon2'
import { SessionsService } from '../sessions/sessions.service'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private sessionsService: SessionsService
	) {}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			nick: dto.nick,
			password: await hash(dto.password)
		}

		const userCreated = await this.prisma.user.create({
			data: {
				...user,
				sessions: {
					createMany: {
						data: this.sessionsService.generateDefaultSessions()
					}
				},
				settings: {
					create: {}
				}
			},
			include: {
				settings: true
			}
		})

		return userCreated
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		})
	}

	async getById(id: string) {
		const res = await this.prisma.user.findUnique({
			where: { id },
			include: {
				settings: true
			}
		})
		return res
	}

	updateNickname(id: string, newNick: string) {
		return this.prisma.user.update({ where: { id }, data: { nick: newNick } })
	}

	async deleteUser(id: string) {
		try {
			return await this.prisma.user.delete({ where: { id } })
		} catch (error) {
			console.log(error)
		}
	}
}
