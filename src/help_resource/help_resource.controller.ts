import { Controller, Post, Body, Query } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { CreateHelpResourceDto, CreateHelpResourceDtoOrigin } from './dto/create-help_resource.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Controller('help-resource')
export class HelpResourceController {
  constructor(private readonly helpResourceService: HelpResourceService) {}

  // @Post()
  // async create(@Body() createHelpResourceDtoOrigin: CreateHelpResourceDtoOrigin) {
  //   console.log('createHelpResourceDtoOrigin',createHelpResourceDtoOrigin)
  //   const plain = instanceToPlain(createHelpResourceDtoOrigin)
  //   for (const [key, value] of Object.entries(createHelpResourceDtoOrigin.location)) {
  //     plain[`location${key.charAt(0).toUpperCase()}${key.slice(1)}`] = value;
  //   }
  //   delete plain.location
  //   console.log('plain',plain)
  //   const createHelpResourceDto = plainToClass(CreateHelpResourceDto, plain)
  //   console.log('createHelpResourceDto',createHelpResourceDto)
  //   return await this.helpResourceService.create(createHelpResourceDto);
  // }
  @Post()
  async create(@Body() createHelpResourceDto: CreateHelpResourceDto) {
    console.log('createHelpResourceDto',createHelpResourceDto)
    return await this.helpResourceService.create(createHelpResourceDto);
  }
}
