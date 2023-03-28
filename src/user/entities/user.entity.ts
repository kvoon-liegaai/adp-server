// use/entities/user.entity.ts
import { Role } from 'src/role/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
