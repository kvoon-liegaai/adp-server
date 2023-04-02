import { Test, TestingModule } from '@nestjs/testing';
import { HelpResourceController } from './help_resource.controller';
import { HelpResourceService } from './help_resource.service';

describe('HelpResourceController', () => {
  let controller: HelpResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpResourceController],
      providers: [HelpResourceService],
    }).compile();

    controller = module.get<HelpResourceController>(HelpResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
