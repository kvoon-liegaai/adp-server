import { Controller, Post, Body, Get, ParseIntPipe, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResourceStatus } from './entities/help_resource.entity';

@Controller('help-resource')
export class HelpResourceController {
  constructor(
    private readonly helpResourceService: HelpResourceService,
  ) {}

  // update

  @Post()
  async create(
    @Req() req: any,
    @Body() createHelpResourceDto: CreateHelpResourceDto
    ) {
    console.log('createHelpResourceDto',createHelpResourceDto)
    return await this.helpResourceService.create(req.user.id, createHelpResourceDto);
  }

  // get 

  @Get()
  async findAll() {
    return await this.helpResourceService.findAll()
  }

  @Get(':id')
  async findAllByUserId(@Param('id', ParseIntPipe) id:number) {
    return await this.helpResourceService.findAllByUserId(id)
  }

  // get tag
  
  @Get('tag/:tag')
  async findAllByTag(@Param('tag') encodedTag: string) {
    const tag = decodeURIComponent(encodedTag)
    console.log('tag',tag)
    return await this.helpResourceService.findAllByTag(tag)
  }

  // get receiver

  @Get('appoint/receiver')
  async findReceiverAll(@Req() req: any) {
    const id:number = req.user.id
    return await this.helpResourceService.findReceiverAll(id)
  }

  @Get('appoint/receiver/:status')
  async findReceiverAllWithStatus(
    @Req() req: any,
    @Param('status') status:HelpResourceStatus,
  ) {
    const id:number = req.user.id
    return await this.helpResourceService.findReceiverAllWithStatus(id, status)
  }

  // get provider

  @Get('appoint/provider')
  async findProviderAll(@Req() req: any) {
    const id:number = req.user.id
    return await this.helpResourceService.findProviderAll(id)
  }

  @Get('appoint/provider/:status')
  async findProviderAllWithStatus(
    @Req() req: any,
    @Param('status', ParseIntPipe) status:HelpResourceStatus,
  ) {
    const id:number = req.user.id
    console.log('status',status)
    return await this.helpResourceService.findProviderAllWithStatus(id, status)
  }

  // delete

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe, ) id:number, @Req() req:any){
    const res = await this.helpResourceService.findOneById(id)
    if(res.user === req.user.id)
      await this.helpResourceService.delete(id)
    else
      throw new HttpException('无权删除', HttpStatus.NOT_ACCEPTABLE)
  }
}
