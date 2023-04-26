import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHrRecordDto } from './dto/create-hr_record.dto';
import { UpdateHrRecordDto } from './dto/update-hr_record.dto';
import { HrRecord } from './entities/hr_record.entity';

@Injectable()
export class HrRecordService {
  constructor(
    @InjectRepository(HrRecord)
    private hrRecordRepo: Repository<HrRecord>
  ) {}
  create(createHrRecordDto: CreateHrRecordDto) {
    return 'This action adds a new hrRecord';
  }

  findOne(id: number) {
    return `This action returns a #${id} hrRecord`;
  }

  async update(id: number, updateHrRecordDto: UpdateHrRecordDto) {
    return this.hrRecordRepo.update({ id }, updateHrRecordDto)
  }
}
