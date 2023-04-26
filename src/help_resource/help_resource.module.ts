import { Module } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { HelpResourceController } from './help_resource.controller';
import { HelpResource } from './entities/help_resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { HrRecordModule } from 'src/hr_record/hr_record.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HelpResource,
    ]),
    UserModule,
    HrRecordModule,
  ],
  controllers: [HelpResourceController],
  providers: [HelpResourceService ],
  exports: [HelpResourceService],
})
export class HelpResourceModule {}
