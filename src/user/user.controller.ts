import {
	Controller,
	Get,
	Body,
	Delete,
	UsePipes,
	ValidationPipe,
  HttpCode,
  Put,
	UnauthorizedException
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decoradors/auth.decorator'
import { GetUser } from '../auth/decoradors/GetUser.decorator'
import { UpdateUserNickDto } from './dto/update-nick.dto'
import { ConfigService } from '@nestjs/config'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService, private configService: ConfigService) {}

	@Auth()
	@Get()
	getUser(@GetUser('id') userId: string) {
		return this.userService.getById(userId)
	}

	@UsePipes(new ValidationPipe())
  @HttpCode(201)
	@Put('update-nick')
  @Auth()
	update(@GetUser('id') userId: string, @Body() dto: UpdateUserNickDto) {
		this.userService.updateNickname(userId, dto.newNick)
	}

	@Delete()
  @Auth()
	remove(@GetUser('id') userId: string, @Body() body: {pass: string}) {
		if(body.pass !== this.configService.get('PASS_TO_DEL')) throw new UnauthorizedException('ur not permit to do this')
    this.userService.deleteUser(userId)
  }
}
 