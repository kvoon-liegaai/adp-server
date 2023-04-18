import { User } from "src/user/entities/user.entity"
import { Column, Entity,  ManyToMany,  ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Location } from "src/location/entity/location.entity"

export enum HelpResourceStatus {
  PENDING,
  FULFILL,
  CANCELED,
  ONGOING,
  DELETE
}

@Entity('helpResource')
export class HelpResource {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  subArea: string

  @Column()
  tag: string

  @Column()
  describe: string

  @Column()
  start_date: string

  @Column()
  end_date: string

  @Column({type: 'enum', enum: HelpResourceStatus, default: HelpResourceStatus.PENDING})
  status: HelpResourceStatus

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  // @Column(() => Location)
  // location: Location
  @Column({type: 'float',default: () => 0.0})
  longitude: number

  @Column({type: 'float',default: () => 0.0})
  latitude: number

  @ManyToOne(() => User, (user) => user.helpResources)
  user:User

  @ManyToOne(() => User, (user) => user.helpResources)
  receiver?: User
}
