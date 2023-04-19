import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Not, Repository } from 'typeorm';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResource, helpResourceStatus, HelpResourceStatus } from './entities/help_resource.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class HelpResourceService {
  constructor(
    @InjectRepository(HelpResource)
    private helpResourceRepository: Repository<HelpResource>,
    @Inject(UserService)
    private userService: UserService
  ) {}

  // create

  async create(userId: number, createHelpResourceDto: CreateHelpResourceDto) {
    console.log('createHelpResourceDto',createHelpResourceDto)
    const user = await this.userService.findOneById(userId)

    const newHelpResource = await this.helpResourceRepository.create({
      ...createHelpResourceDto,
      user: user,
      receiver: null,
    })
    console.log('newHelpResource',newHelpResource)
    return await this.helpResourceRepository.save(newHelpResource)
  }

  // find

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

  // find tag

  async findAllByTag(tag: string) {
    return await this.helpResourceRepository.find({ where: { tag }, relations: ['user', 'receiver']})
  }

  // find receiver

  async findReceiverAll(userId: number) {
    return await this.helpResourceRepository.find({ where: { receiver: { id: userId } }})
  }

  async findReceiverAllWithStatus(userId: number, status: HelpResourceStatus) {
    return await this.helpResourceRepository.find({
      where: {
        receiver: { id: userId  },
        status
      }
    })
  }

  // find provider

  async findProviderAll(userId: number) {
    return await this.helpResourceRepository.find({
      where: {
        user: { id: userId  },
        status: Not(helpResourceStatus.UNUSED)
      }
    })
  }

  async findProviderAllWithStatus(userId: number, status: HelpResourceStatus) {
    return await this.helpResourceRepository.find({
      where: {
        user: { id: userId  },
        status
      }
    })
  }

  // update

  async updateStatus(id: number, status: HelpResourceStatus) {
    const hr = await this.findOneById(id)
    hr.status = status
    await this.helpResourceRepository.save(hr)
  }

  // delete

  @HttpCode(200)
  async delete(id: number) {
    await this.helpResourceRepository.delete(id)
  }

  // async addReceiver() {}
}
