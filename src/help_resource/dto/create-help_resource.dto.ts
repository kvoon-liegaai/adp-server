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
  startDate: string

  @ApiProperty()
  @IsString()
  endDate: string

  @ApiProperty()
  @IsNumber()
  userId: number

  @ApiProperty()
  @IsString()
  describe: string
  // constructor() {
  //   super()
  // }
}
