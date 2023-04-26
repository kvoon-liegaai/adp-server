import { Module } from '@nestjs/common';
import { HrRecordService } from './hr_record.service';
import { HrRecordController } from './hr_record.controller';
import { HrRecord } from './entities/hr_record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HrRecord
    ]),
  ],
  controllers: [HrRecordController],
  providers: [HrRecordService],
  exports: [HrRecordService],
})
export class HrRecordModule {}
