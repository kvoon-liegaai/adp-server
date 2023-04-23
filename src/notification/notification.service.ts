import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnCode, WsRes } from 'src/common/ws';
import { Repository } from 'typeorm';
import { CreateHrApplyDto } from './dto/HrApply.dto';
import { HrApply } from './entities/hr-apply.entity';
// import { UpdateHrApplyDto } from './dto/update-hr-apply.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(HrApply)
    private hrApplyRepo: Repository<HrApply>,
  ) {}
  async create(createHrApplyDto: CreateHrApplyDto): Promise<WsRes> {
    this.logger.debug('createHrApplyDto',createHrApplyDto)

    if(createHrApplyDto.providerId === createHrApplyDto.userId) {
      return {
        code: ReturnCode.fail,
        message: '您不能为自己提供服务',
      }
    }

    const isExist = !!(await this.hrApplyRepo.findOne({
      where: {
        userId: createHrApplyDto.userId,
        helpResourceId: createHrApplyDto.helpResourceId,
      }
    }))

    if(isExist) {
      return { 
        code: ReturnCode.fail,
        message: '不要重复请求'
       }
    }

    const hrApply = this.hrApplyRepo.create(createHrApplyDto)
    await this.hrApplyRepo.save(hrApply)

    return {
      code: ReturnCode.success,
      message: '请求成功'
    }
  }
}
