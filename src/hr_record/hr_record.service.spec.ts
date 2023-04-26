import { Test, TestingModule } from '@nestjs/testing';
import { HrRecordService } from './hr_record.service';

describe('HrRecordService', () => {
  let service: HrRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrRecordService],
    }).compile();

    service = module.get<HrRecordService>(HrRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
