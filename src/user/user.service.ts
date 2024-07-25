import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { hash } from 'argon2'
import { SessionsService } from 'src/sessions/sessions.service'

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
			}
		})

		return userCreated
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } })
	}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				settings: true
			}
		})
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
