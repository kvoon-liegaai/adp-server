import { User } from "src/user/entities/user.entity"
import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Location } from "src/location/entity/location.entity"

@Entity('helpResource')
export class HelpResource {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.helpResource)
  user: User

  @Column()
  name: string

  @Column()
  subArea: string

  @Column()
  startDate: string

  @Column()
  endDate: string

  // @Column(() => Location)
  // location: Location
  @Column({type: 'float',default: () => 0.0})
  longitude: number

  @Column({type: 'float',default: () => 0.0})
  latitude: number
}
