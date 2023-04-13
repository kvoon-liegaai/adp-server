import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResource, HelpResourceStatus } from './entities/help_resource.entity';
import { UserService } from 'src/user/user.service';
import { UpdateHelpResourceDto } from './dto/update-help_resource.dto';

@Injectable()
export class HelpResourceService {
  constructor(
    @InjectRepository(HelpResource)
    private helpResourceRepository: Repository<HelpResource>,
    @Inject(UserService)
    private userService: UserService
  ) {}

  async create(createHelpResourceDto: CreateHelpResourceDto) {
    console.log('createHelpResourceDto',createHelpResourceDto)
    const userId = createHelpResourceDto.userId
    const newHelpResource = await this.helpResourceRepository.create(createHelpResourceDto)
    await this.userService.addHelpResource(userId, newHelpResource)
    return await this.helpResourceRepository.save(newHelpResource)
  }

  async findAll() {
    return await this.helpResourceRepository.find();
  }

  async findOneById(id: number) {
    const hr = await this.helpResourceRepository.findOneBy({ id })

    if(!hr) {
      throw new HttpException('互助资源不存在', HttpStatus.NO_CONTENT)
    }
    return hr;
  }

  async findAllByUserId(userId: number) {
    const user = await this.userService.findOneById(userId, true)
    return user.helpResources
  }

  async updateStatus(id: number, status: HelpResourceStatus) {
    const hr = await this.findOneById(id)
    hr.status = status
    await this.helpResourceRepository.save(hr)
  }

  @HttpCode(200)
  async delete(id: number) {
    await this.helpResourceRepository.delete(id)
  }

  async addUser(userId: number, hrId) {
    const hr = await this.findOneById(hrId)
    const user = await this.userService.findOneById(userId)

    if(hr.userId === userId) throw new HttpException('不能添加自己的服务', HttpStatus.NOT_ACCEPTABLE)

    if(hr && user) {
      hr.users.push(user)
      return await this.helpResourceRepository.save(hr)
    }
    else
      throw new HttpException('用户或互助资源不存在', HttpStatus.NOT_FOUND)
  }
}
