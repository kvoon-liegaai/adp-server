import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class UpdateHrRecordDto {
  @ApiProperty()
  @IsDate()
  start_date?: Date

  @ApiProperty()
  @IsDate()
  end_date?: Date
}
