import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'
import type { Response } from 'express'

@Injectable()
export class AuthService {
	private EXPIRE_DAY_REEFRESH_TOKEN = 60

	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private configService: ConfigService
	) {}

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.generateTokens(user.id)
		const res = { user, ...tokens }
		return res
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)

		if (oldUser) throw new BadRequestException('User already exists')

		const { password, ...user } = await this.userService.create(dto)

		const tokens = this.generateTokens(user.id)

		return { user, ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const { password, ...user } = await this.userService.getById(result.id)

		const tokens = this.generateTokens(user.id)

		return { user, ...tokens }
	}

	private generateTokens(userId: string) {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, {
			expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES')
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES')
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('user not found')

		const isValid = await verify(user.password, dto.password)

		console.log(isValid)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDay() + this.EXPIRE_DAY_REEFRESH_TOKEN)

		res.cookie(this.configService.get('REFRESH_TOKEN_NAME'), refreshToken, {
			httpOnly: true,
			domain: this.configService.get('COOKIE_DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'lax'
		})
	}

	removeRefreshTokenToResponse(res: Response) {
		res.cookie(this.configService.get('REFRESH_TOKEN_NAME'), '', {
			httpOnly: true,
			domain: this.configService.get('COOKIE_DOMAIN'),
			expires: new Date(0),
			secure: true,
			sameSite: 'lax'
		})
	}
}
