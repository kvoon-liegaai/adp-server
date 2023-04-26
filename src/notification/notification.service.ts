import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { helpResourceApplyMsgState, HelpResourceReqMsgStatus, ReturnCode, WsRes } from 'src/common/ws';
import { HelpResource, helpResourceStatus, HelpResourceStatus } from 'src/help_resource/entities/help_resource.entity';
import { HelpResourceService } from 'src/help_resource/help_resource.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateHrApplyDto } from './dto/HrApply.dto';
import { HrApply } from './entities/hr-apply.entity';
import { HrRecordService } from 'src/hr_record/hr_record.service';
// import { UpdateHrApplyDto } from './dto/handle-apply-apply.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(HrApply)
    private hrApplyRepo: Repository<HrApply>,
    @Inject(HelpResourceService)
    private readonly helpResourceService: HelpResourceService,
    @Inject(HrRecordService)
    private hrRecordService: HrRecordService,
  ) {}

  // 创建获取服务申请
  async createHrApply(createHrApplyDto: CreateHrApplyDto): Promise<WsRes> {
    this.logger.debug('createHrApplyDto',createHrApplyDto)

    if(createHrApplyDto.providerId === createHrApplyDto.userId) {
      return {
        code: ReturnCode.fail,
        message: '您不能为自己提供服务',
      }
    }

    // const isExist = !!(await this.hrApplyRepo.findOne({
    //   where: {
    //     userId: createHrApplyDto.userId,
    //     helpResourceId: createHrApplyDto.helpResourceId,
    //   }
    // }))

    // if(isExist) {
    //   return { 
    //     code: ReturnCode.fail,
    //     message: '不要重复请求'
    //    }
    // }

    const hrApply = this.hrApplyRepo.create(createHrApplyDto)
    await this.hrApplyRepo.save(hrApply)

    return {
      code: ReturnCode.success,
      message: '请求成功'
    }
  }

  // 接受/拒绝申请
  // userId: receiver id
  async updateHrApplyStatus(helpResourceId: number, userId: number, status: HelpResourceReqMsgStatus): Promise<WsRes> {
    // 接受：添加 receiver
    if(status === helpResourceApplyMsgState.FULFILLED)
      await this.helpResourceService.addReceiver(helpResourceId, userId)

    // 开始
    // 取消
    // 删除

    // change status
    const data = await this.hrApplyRepo.update({ userId }, { status })

    return {
      code: ReturnCode.success,
      message: '操作成功',
      data
    }
  }

  async updateHrStatus(helpResourceId: number,  status: HelpResourceStatus) {
    this.logger.debug(status)
    const updateModel: DeepPartial<HelpResource> = {
      status
    }
    switch(status) {
      case helpResourceStatus.ONGOING:{
        updateModel.record = {
          start_date: new Date(),
        }
        break;
      }
        // await this.helpResourceService.addRecord(helpResourceId)
        // await this.hrRecordService.update()
      case helpResourceStatus.CANCELED:
        updateModel.record = {
          end_date: new Date(),
        }
        break;
      case helpResourceStatus.DELETE:
        break;
      case helpResourceStatus.FULFILL:
        updateModel.record.end_date = new Date()
        break;
      default:
        break;
    }

    // change state
    await this.helpResourceService.update(helpResourceId, updateModel)

    return {
      code: ReturnCode.success,
      message: '操作成功'
    }
  }
}
