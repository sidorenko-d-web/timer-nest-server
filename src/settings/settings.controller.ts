import { Controller, Body, Param, Put } from '@nestjs/common'
import { SettingsService } from './settings.service'
import type { UpdateSettingsDto } from './dto/update-settings.dto'

@Controller('settings')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingsDto) {
		return this.settingsService.update(id, updateSettingDto)
	}
}
