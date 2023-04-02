import { Injectable } from '@nestjs/common';
import { CreateHelpResourceDto } from './dto/create-help_resource.dto';
import { UpdateHelpResourceDto } from './dto/update-help_resource.dto';

@Injectable()
export class HelpResourceService {
  create(createHelpResourceDto: CreateHelpResourceDto) {
    return 'This action adds a new helpResource';
  }

  findAll() {
    return `This action returns all helpResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helpResource`;
  }

  update(id: number, updateHelpResourceDto: UpdateHelpResourceDto) {
    return `This action updates a #${id} helpResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} helpResource`;
  }
}
