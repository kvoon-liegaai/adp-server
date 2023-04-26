import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpResourceModule } from 'src/help_resource/help_resource.module';
import { HrApply } from './entities/hr-apply.entity';
import { NotificationGateway } from './notification.gateway'
import { NotificationService } from './notification.service';
import { HrRecordModule } from 'src/hr_record/hr_record.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HrApply]),
    HelpResourceModule,
    HrRecordModule,
  ],
  providers: [NotificationGateway, NotificationService]
})
export class NotificationModule {}
