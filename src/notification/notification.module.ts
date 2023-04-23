import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrApply } from './entities/hr-apply.entity';
import { NotificationGateway } from './notification.gateway'
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HrApply]),
  ],
  providers: [NotificationGateway, NotificationService]
})
export class NotificationModule {}
