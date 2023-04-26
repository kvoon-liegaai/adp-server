import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHrRecordDto } from './dto/create-hr_record.dto';
import { UpdateHrRecordDto } from './dto/update-hr_record.dto';
import { HrRecord } from './entities/hr_record.entity';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';

@Injectable()
export class HrRecordService {
  constructor(
    @InjectRepository(HrRecord)
    private hrRecordRepo: Repository<HrRecord>
  ) {}
  async create(hr: HelpResource) {
    const record = this.hrRecordRepo.create()
    record.hr = hr
    return await this.hrRecordRepo.save(record)
  }

  findOne(id: number) {
    return `This action returns a #${id} hrRecord`;
  }

  async update(id: number, updateHrRecordDto: UpdateHrRecordDto) {
    return this.hrRecordRepo.update({ id }, updateHrRecordDto)
  }
}
