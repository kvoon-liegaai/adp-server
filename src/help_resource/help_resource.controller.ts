import { Controller, Post, Body, Get, ParseIntPipe, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResourceStatus } from './entities/help_resource.entity';

@Controller('help-resource')
export class HelpResourceController {
  constructor(
    private readonly helpResourceService: HelpResourceService,
  ) {}

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

  @Get()
  async findAll() {
    return await this.helpResourceService.findAll()
  }

  @Get(':id')
  async findAllByUserId(@Param('id', ParseIntPipe) id:number) {
    return await this.helpResourceService.findAllByUserId(id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe, ) id:number, @Req() req:any){
    const res = await this.helpResourceService.findOneById(id)
    if(res.userId === req.user.id)
      await this.helpResourceService.delete(id)
    else
      throw new HttpException('无权删除', HttpStatus.NOT_ACCEPTABLE)
  }
}
