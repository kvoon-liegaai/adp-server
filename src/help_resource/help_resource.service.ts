import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResource } from './entities/help_resource.entity';
import { UserService } from 'src/user/user.service';

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
}
