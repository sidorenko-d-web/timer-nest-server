import { Injectable } from '@nestjs/common'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import { PrismaService } from '../prisma.service'

@Injectable()
export class SettingsService {
	constructor(private prisma: PrismaService) {}


	async update(id: string, updateSettingDto: UpdateSettingsDto) {
		const res = await this.prisma.settings.update({
			where: {
				id
			},
			data: updateSettingDto
		})
		console.log(res)
		return res
	}
}
