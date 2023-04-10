import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { HelpResource } from './entities/help_resource.entity';

@Injectable()
export class HelpResourceService {
  constructor(
    @InjectRepository(HelpResource)
    private helpResourceRepository: Repository<HelpResource>,
  ) {}
  async create(createHelpResourceDto: CreateHelpResourceDto) {
    console.log('createHelpResourceDto',createHelpResourceDto)
    const newHelpResource = await this.helpResourceRepository.create(createHelpResourceDto)
    return await this.helpResourceRepository.save(newHelpResource)
  }
}
