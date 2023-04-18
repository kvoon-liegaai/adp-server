import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsObject, IsString } from "class-validator"
import { AddressableDto, LocationDto } from "src/location/dto/location.dto"

export class CreateHelpResourceDto extends AddressableDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  subArea: string

  @ApiProperty()
  @IsString()
  tag: string

  @ApiProperty()
  @IsString()
  start_date: string

  @ApiProperty()
  @IsString()
  end_date: string

  @ApiProperty()
  @IsString()
  describe: string
  // constructor() {
  //   super()
  // }
}
