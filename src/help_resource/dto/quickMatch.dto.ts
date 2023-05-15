import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { AddressableDto } from "src/location/dto/location.dto";

export class QuickMatchDto extends AddressableDto {
  @ApiProperty()
  @IsString()
  subArea: string

  @ApiProperty()
  @IsString()
  start_date: string

  @ApiProperty()
  @IsString()
  end_date: string

  @ApiProperty()
  @IsNumber()
  radius: number
}