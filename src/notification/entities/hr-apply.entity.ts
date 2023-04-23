import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export const helpResourceReqMsgState = {
  PENDING: 0, // 待处理
  FULFILLED: 1, // 接收
  REJECTED: 2, // 拒绝
}

export type HelpResourceReqMsgStatus = typeof helpResourceReqMsgState[keyof typeof helpResourceReqMsgState]

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

  @Column({ type: 'int', default: () => helpResourceReqMsgState.PENDING })
  status: HelpResourceReqMsgStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
