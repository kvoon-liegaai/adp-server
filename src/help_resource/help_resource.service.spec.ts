import { Test, TestingModule } from '@nestjs/testing';
import { HelpResourceService } from './help_resource.service';

describe('HelpResourceService', () => {
  let service: HelpResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpResourceService],
    }).compile();

    service = module.get<HelpResourceService>(HelpResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
