import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode
} from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { GetUser } from 'src/auth/decoradors/GetUser.decorator'
import { Auth } from 'src/auth/decoradors/auth.decorator'

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
	@Post()
  @Auth()
	create(
		@Body() createSessionDto: CreateSessionDto,
		@GetUser('id') userId: string
	) {
		return this.sessionsService.createNewSession(createSessionDto, userId)
	}

	@Get()
  @Auth()
	getAllSessionsOfUser(@GetUser('id') userId: string) {
		return this.sessionsService.getAllSessionsOfUser(userId)
	}

	@Get(':sessionName')
  @Auth()
	getSessionOfUser(@GetUser('id') userId: string, @Param('sessionName') sessionName: string) {
		return this.sessionsService.getSessionOfUser(userId, sessionName)
	}

  @UsePipes(new ValidationPipe())
	@Put(':name')
  @Auth()
	async update(@GetUser('id') userId: string, @Param('name') sessionName: string, @Body() updateSessionDto: UpdateSessionDto) {
		return await this.sessionsService.update(userId, sessionName, updateSessionDto) 
	}

	@Delete(':name')
  @Auth()
	remove(@GetUser('id') userId: string, @Param('name') sessionName: string) {
		return this.sessionsService.remove(userId, sessionName)
	}
}
