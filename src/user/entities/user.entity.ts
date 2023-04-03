// use/entities/user.entity.ts
import type { Field } from 'mysql2';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';
import { Role } from 'src/role/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string;  //昵称

  @Column()
  // @Column({select: false})
  password: string;  // 密码

  @Column({
    name: '头像',
    default: '123'
    // default: () => 'https://i.pravatar.cc/300'
  })
  avatar: string;

  @Column()
  email: string;

  @Column('simple-enum', { enum: Array<Role> })
  role: Role[];   // 用户角色

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

  @OneToMany(() => HelpResource, (helpResource) => helpResource.user)
  @Column({
    type: 'json',
    array: true,
    nullable: true,
    default: null
  })
  helpResource: HelpResource[] | null
}
