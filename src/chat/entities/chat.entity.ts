import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../../message/entity/message.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.chats)
  users: User[];

  @OneToMany(() => Message, message => message.chat)
  @JoinTable({
    name: 'chat_messages',
    joinColumns: [{ name: 'chat_id' }],
    inverseJoinColumns: [{ name: 'message_id' }],
  })
  messages: Message[]
}