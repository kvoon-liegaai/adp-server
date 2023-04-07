import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LocationDto {
  @ApiProperty()
  @IsNumber()
  longitude: number

  @ApiProperty()
  @IsNumber()
  latitude: number
}

export class AddressableDto {
  @ApiProperty()
  @IsNumber()
  longitude: number
  // locationLongitude: number

  @ApiProperty()
  @IsNumber()
  // locationLatitude: number
  latitude: number
}