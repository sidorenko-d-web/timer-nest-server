import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Res,
	Req,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import type { AuthDto } from './dto/auth.dto'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private configService: ConfigService
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('login')
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, ...response } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('register')
	async register(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@HttpCode(201)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies: string =
			req.cookies[this.configService.get('REFRESH_TOKEN_NAME')]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenToResponse(res)
			throw new UnauthorizedException('Refresh token not passed')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
	}

	@HttpCode(201)
  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response){
    this.authService.removeRefreshTokenToResponse(res)
    return true
  }
}
