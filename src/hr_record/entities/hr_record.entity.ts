import { HelpResource } from "src/help_resource/entities/help_resource.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('hr_record')
export class HrRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_date: Date

  @Column({
    name: 'start_time',
    type: 'timestamp',
    nullable: true,
  })
  start_date: Date

  @Column({
    name: 'end_time',
    type: 'timestamp',
    nullable: true,
  })
  end_date: Date

  @ManyToOne(() => HelpResource, (hr) => hr.records, {
    cascade: true
  })
  hr: HelpResource
}
