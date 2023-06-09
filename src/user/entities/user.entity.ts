// use/entities/user.entity.ts
import { Exclude } from 'class-transformer';
import { Chat } from 'src/chat/entities/chat.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';
import { Role } from 'src/role/role.enum';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string;  //昵称

  @Column()
  // 当 类 -> json 时跳过
  @Exclude({toPlainOnly: true})
  // 当 json -> 类时不跳过
  @Exclude({toClassOnly: false})
  // @Column({select: false})
  password: string;  // 密码

  @Column({
    name: 'avatar',
    default: ''
    // default: () => 'https://i.pravatar.cc/300'
  })
  avatar: string;

  @Column()
  email: string;

  @Column({
    name:'roles',
    type: 'enum',
    enum: Role,
    default: [Role.Root]
  })
  roles: Role[];   // 用户角色

  @Column({default: ''})
  describe: string

  @Column({default: 0})
  serviceTimes: number

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @OneToMany(() => HelpResource, (helpResource) => helpResource.user, {
    cascade: true
  })
  @JoinTable({
    name: 'user_resource',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'resource_id' }],
  })
  helpResources: HelpResource[]

  @OneToMany(() => Evaluation, (evaluation) => {evaluation.user})
  evaluations: Evaluation[]

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable({name: 'user_chat'})
  chats: Chat[]

  toJSON():Partial<User> {
    const {password, ...rest} = this;
    return rest
  }
}

/// tstse
///12312312
// 2314qwerjkl;fkaf