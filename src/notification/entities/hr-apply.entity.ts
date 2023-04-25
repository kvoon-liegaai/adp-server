import { helpResourceApplyMsgState, HelpResourceReqMsgStatus } from 'src/common/ws';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity("HrApply")
export class HrApply {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  helpResourceId: number;

  // @ManyToOne(() => User, { eager: true })
  @Index()
  @Column()
  providerId: number;

  // @ManyToOne(() => User, { eager: true })
  @Index()
  @Column()
  userId: number;

  @Column({ type: 'int', default: () => helpResourceApplyMsgState.PENDING })
  status: HelpResourceReqMsgStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
