import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpResourceModule } from 'src/help_resource/help_resource.module';
import { HrApply } from './entities/hr-apply.entity';
import { NotificationGateway } from './notification.gateway'
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HrApply]),
    HelpResourceModule,
  ],
  providers: [NotificationGateway, NotificationService]
})
export class NotificationModule {}
