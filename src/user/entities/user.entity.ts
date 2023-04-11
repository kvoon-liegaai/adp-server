// use/entities/user.entity.ts
import { Exclude } from 'class-transformer';
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
  @Exclude()
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

  @ManyToMany(() => HelpResource, (helpResource) => helpResource.users, {
    cascade: true
  })
  @JoinTable({
    name: 'user_resource',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'resource_id' }],
  })
  helpResources: HelpResource[]
}
