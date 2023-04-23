import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateHrApplyDto {
  @ApiProperty()
  @IsNumber()
  userId: number

  @ApiProperty()
  @IsNumber()
  providerId: number
}
