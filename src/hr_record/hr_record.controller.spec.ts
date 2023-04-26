import { Test, TestingModule } from '@nestjs/testing';
import { HrRecordController } from './hr_record.controller';
import { HrRecordService } from './hr_record.service';

describe('HrRecordController', () => {
  let controller: HrRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrRecordController],
      providers: [HrRecordService],
    }).compile();

    controller = module.get<HrRecordController>(HrRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
