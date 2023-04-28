import { HelpResource } from 'src/help_resource/entities/help_resource.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evaluation')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  // NOTE: 以 ',' 分割字符串
  @Column({ type: 'varchar', length: 255,  default: ''})
  briefs: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  description: string;

  @Column({ type: 'integer', default: 5})
  ratingScore: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @ManyToOne(() => HelpResource, hr => hr.evaluations, { cascade: true })
  @JoinColumn({ name: 'hr_id' })
  hr: HelpResource;
}
