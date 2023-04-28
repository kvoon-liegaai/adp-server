import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEvaluationDto {
  @ApiProperty({
    example: ['good', 'fast', 'cheap'],
    description: 'Brief descriptions of the evaluation, up to 255 characters per brief.',
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  briefs: string[];

  @ApiProperty({
    example: 'I really liked this product!',
    description: 'Detailed description of the evaluation, can be up to several thousand characters long.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 5,
    description: 'The overall score of the evaluation, a number between 1 and 5.',
  })
  @IsNotEmpty()
  @IsNumber()
  ratingScore: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the order this evaluation is for.',
  })
  @IsNotEmpty()
  @IsNumber()
  hrId: number;
}