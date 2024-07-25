import { Injectable } from '@nestjs/common'
import type { CreateSettingsDto } from './dto/create-settings.dto'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SettingsService {
	constructor(private prisma: PrismaService) {}

	create(createSettingDto: CreateSettingsDto) {
		return this.prisma.settings.create({
			data: {
				userId: createSettingDto.userId
			}
		})
	}

	update(id: string, updateSettingDto: UpdateSettingsDto) {
		return this.prisma.settings.update({
			where: {
				id
			},
			data: updateSettingDto
		})
	}
}
