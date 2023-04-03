import { Module } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { HelpResourceController } from './help_resource.controller';

@Module({
  controllers: [HelpResourceController],
  providers: [HelpResourceService]
})
export class HelpResourceModule {}
