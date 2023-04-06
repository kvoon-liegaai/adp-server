import { User } from "src/user/entities/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

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

  @Column({type: 'json'})
  lnglat: {
    longitude: number,
    latitude: number
  }
}
