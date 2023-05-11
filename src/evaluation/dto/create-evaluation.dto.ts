import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEvaluationDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  briefs: string[];

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  ratingScore: number;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  hrId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  targetUserId: number
}