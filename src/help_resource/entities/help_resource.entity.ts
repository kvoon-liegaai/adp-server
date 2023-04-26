import { HrRecord } from "src/hr_record/entities/hr_record.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
// import { Location } from "src/location/entity/location.entity"

export const helpResourceStatus = {
  UNUSED: 0,  // 0: 无人使用
  PENDING: 1, // 1: 接受、未开始
  FULFILL: 2, // 2: 接受、完成
  CANCELED: 3, // 3: 接受、取消
  ONGOING: 4, // 4: 接受、进行中
  DELETE: 5, // 5: 删除
}

export type HelpResourceStatus = typeof helpResourceStatus[keyof typeof helpResourceStatus]

@Entity('helpResource')
export class HelpResource {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  subArea: string

  @Index()
  @Column()
  tag: string

  @Column()
  describe: string

  @Column()
  start_date: string

  @Column()
  end_date: string

  @Column({type: 'int', default: helpResourceStatus.UNUSED})
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

  @OneToMany(() => HrRecord, (hrRecord) => hrRecord.hr, {
    eager: true
  })
  records: HrRecord[]
}
