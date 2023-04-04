import { Module } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { HelpResourceController } from './help_resource.controller';
import { HelpResource } from './entities/help_resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelpResource, User])],
  controllers: [HelpResourceController],
  providers: [HelpResourceService],
  exports: [HelpResourceService],
})
export class HelpResourceModule {}
