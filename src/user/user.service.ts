import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HelpResource } from 'src/help_resource/entities/help_resource.entity';

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

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id })

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

  async addHelpResource(userId: number, helpResource: HelpResource) {
    const user = await this.findOneById(userId)
    if(!user) {
      throw new HttpException('用户不存在', HttpStatus.NO_CONTENT)
    }

    if(!user?.helpResources) user.helpResources = []

    user.helpResources.push(helpResource)
    

    console.log('@@@@@@@@@user',user)

    await this.userRepository.save(user)

    return '更新成功'
  }
}
