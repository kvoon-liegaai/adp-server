import { ApiProperty } from "@nestjs/swagger"
import { IsJSON, IsString, ValidateNested } from "class-validator"

export class CreateHelpResourceDto {
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
  @ValidateNested()
  // @IsJSON()
  lnglat: {
    longitude: number,
    latitude: number
  }

  @ApiProperty()
  userId: number
}
