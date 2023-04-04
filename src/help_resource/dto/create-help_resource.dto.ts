import { ApiProperty } from "@nestjs/swagger"
import { IsJSON, IsString } from "class-validator"

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
  @IsJSON()
  geo: Record<string, any>
}
