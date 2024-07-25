import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
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

	@Get(':id')
  @Auth()
	getSessionOfUser(@Param('id') sessionId: string) {
		return this.sessionsService.getSessionOfUser(sessionId)
	}

  @UsePipes(new ValidationPipe())
	@Put(':id')
  @Auth()
	update(@Param('id') sessionId: string, @Body() updateSessionDto: UpdateSessionDto) {
		return this.sessionsService.update(sessionId, updateSessionDto)
	}

	@Delete(':id')
  @Auth()
	remove(@Param('id') id: string) {
		return this.sessionsService.remove(id)
	}
}
