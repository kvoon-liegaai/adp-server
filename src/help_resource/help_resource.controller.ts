import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { UpdateHelpResourceDto } from './dto/update-help_resource.dto';

@Controller('help-resource')
export class HelpResourceController {
  constructor(private readonly helpResourceService: HelpResourceService) {}

  @Post()
  create(@Body() createHelpResourceDto: CreateHelpResourceDto) {
    return this.helpResourceService.create(createHelpResourceDto);
  }

  @Get()
  findAll() {
    return this.helpResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelpResourceDto: UpdateHelpResourceDto) {
    return this.helpResourceService.update(+id, updateHelpResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpResourceService.remove(+id);
  }
}
