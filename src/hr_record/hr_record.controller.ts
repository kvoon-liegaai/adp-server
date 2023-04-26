import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrRecordService } from './hr_record.service';
import { CreateHrRecordDto } from './dto/create-hr_record.dto';
import { UpdateHrRecordDto } from './dto/update-hr_record.dto';

@Controller('hr-record')
export class HrRecordController {
  constructor(private readonly hrRecordService: HrRecordService) {}

  // @Post()
  // create(@Body() createHrRecordDto: CreateHrRecordDto) {
  //   return this.hrRecordService.create(createHrRecordDto);
  // }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrRecordDto: UpdateHrRecordDto) {
    return this.hrRecordService.update(+id, updateHrRecordDto);
  }
}
