import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { HelpResourceStatus } from '../entities/help_resource.entity';
import { CreateHelpResourceDto } from './create-help_resource.dto';

export class UpdateHelpResourceDto extends PartialType(CreateHelpResourceDto) {
  @ApiProperty()
  @IsNumber()
  status: HelpResourceStatus
}
