import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findOneById(id: number, relation = false) {
    const user = !relation
      ? await this.userRepository.findOneBy({ id })
      : await this.userRepository.findOne({ 
        where: { id, },
        relations: ['helpResources']
      })

    if(!user) {
      throw new HttpException('用户不存在', HttpStatus.NO_CONTENT)
    }
    return user;
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

  async getProfileByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if(!user) {
      throw new HttpException('用户不存在', HttpStatus.NO_CONTENT)
    }
    console.log('user',user)
    return user
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({id: userId}, updateUserDto)
  }
}
