import { IsNumber } from "class-validator";
import { Column, } from "typeorm";

export class Location {
  @Column({type: 'float',default: () => 0.0})
  @IsNumber()
  longitude: number

  @Column({type: 'float',default: () => 0.0})
  @IsNumber()
  latitude: number
}