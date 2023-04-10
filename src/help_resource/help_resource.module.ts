import { Module } from '@nestjs/common';
import { HelpResourceService } from './help_resource.service';
import { HelpResourceController } from './help_resource.controller';
import { HelpResource } from './entities/help_resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HelpResource]),
    UserModule
  ],
  controllers: [HelpResourceController],
  providers: [HelpResourceService],
  exports: [HelpResourceService],
})
export class HelpResourceModule {}
