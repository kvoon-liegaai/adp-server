import { HttpCode, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Not, Repository } from 'typeorm';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResource, helpResourceStatus, HelpResourceStatus } from './entities/help_resource.entity';
import { UserService } from 'src/user/user.service';
import { HrRecordService } from 'src/hr_record/hr_record.service';

@Injectable()
export class HelpResourceService {
  logger = new Logger()
  constructor(
    @InjectRepository(HelpResource)
    private helpResourceRepository: Repository<HelpResource>,
    @Inject(UserService)
    private userService: UserService,
    @Inject(HrRecordService)
    private hrRecordService: HrRecordService,
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

  async findOneById(id: number, relations: string[] = []) {
    const hr = await this.helpResourceRepository.findOne({
      where: {id},
      relations,
    })

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
    const res = await this.helpResourceRepository.find({ where: { tag }, relations: ['user', 'receiver' ]})
    return res
  }

  // find receiver

  async findReceiverAll(userId: number) {
    return await this.helpResourceRepository.find({
      where: {
        receiver: { id: userId },
        status: Not(helpResourceStatus.UNUSED)
      },
      relations: ['user', 'evaluations']
    })
  }

  async findReceiverAllWithStatus(userId: number, status: HelpResourceStatus) {
    return await this.helpResourceRepository.find({
      where: {
        receiver: { id: userId  },
        status
      },
      relations: ['user', 'evaluations']
    })
  }

  // find provider

  async findProviderAll(userId: number) {
    return await this.helpResourceRepository.find({
      where: {
        user: { id: userId  },
        status: Not(helpResourceStatus.UNUSED)
      },
      relations: ['receiver', 'evaluations']
    })
  }

  async findProviderAllWithStatus(userId: number, status: HelpResourceStatus) {
    return await this.helpResourceRepository.find({
      where: {
        user: { id: userId  },
        status
      },
      relations: ['receiver', 'evaluations']
    })
  }

  // patch

  async update(id: number, partObj: DeepPartial<HelpResource>) {
    console.log('id',id)
    console.log('partObj',partObj)
    // return await this.helpResourceRepository.update({ id: id }, partObj)
    const toSave = { id, ...partObj }
    console.log('toSave',toSave)
    return await this.helpResourceRepository.save({ id, ...partObj })
  }
  // const hr = await this.findOneById(id)
  // await this.helpResourceRepository.save({
  //   ...hr,
  //   ...partObj
  // })
  // const res = await this.helpResourceRepository.update({ id: id }, {
  //   status: helpResourceStatus.CANCELED,
  // })
  // return res

  async addReceiver(id: number, receiverId: number) {
    // add receiver
    const receiver = await this.userService.findOneById(receiverId)

    // add record
    const hr = await this.findOneById(id)
    await this.hrRecordService.create(hr)

    return await this.helpResourceRepository.update({id}, {
      receiver,
      status: helpResourceStatus.PENDING, // set status
    })
  }

  // async addRecord(id: number) {
  //   const hr = await this.findOneById(id)
  //   const oldRecords = hr.records
  //   const record = new HrRecord()
  //   return await this.helpResourceRepository.update({ id }, {
  //     records: [
  //       ...oldRecords,
  //       record
  //     ]
  //   })
  // }

  // async updateRecord(id: number, updateHrRecordDto: UpdateHrRecordDto) {
  //   const oldRecords = hr.records
  //   oldRecords
  //   await this.helpResourceRepository.update({ id }, {
  //     records
  //   })
  // }

  // delete

  @HttpCode(200)
  async delete(id: number) {
    await this.helpResourceRepository.delete(id)
  }

  // async addReceiver() {}
}
