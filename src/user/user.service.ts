import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    if(await this.userRepository.exist()) {
      const existUser = await this.userRepository.findOneBy({
        username
      })
      if(existUser){
        throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
      }
    }

    const newUser = await this.userRepository.create(createUser)
    return await this.userRepository.save(newUser);
  }

  async findOneByUserName(username: string) {
    const user = await this.userRepository.findOneBy({
      username
    })

    if(!user) {
      throw new HttpException('用户名不存在', HttpStatus.NO_CONTENT)
    }
    return user;
  }
}
