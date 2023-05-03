import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number

  @Column()
  content: string

  @Column()
  messageType: string

  @ManyToOne(() =>  Chat, chat => chat.messages)
  chat: Chat


  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}