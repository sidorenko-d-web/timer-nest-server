import { Injectable } from '@nestjs/common'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SettingsService {
	constructor(private prisma: PrismaService) {}


	update(id: string, updateSettingDto: UpdateSettingsDto) {
		return this.prisma.settings.update({
			where: {
				id
			},
			data: updateSettingDto
		})
	}
}
