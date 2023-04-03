import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HelpResource])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
