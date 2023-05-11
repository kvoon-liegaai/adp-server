import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { HelpResourceService } from 'src/help_resource/help_resource.service';
import { UserService } from 'src/user/user.service';
import { relative } from 'path';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationsRepository: Repository<Evaluation>,
    @Inject(HelpResourceService)
    private readonly helpResourceService: HelpResourceService,
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async create(userId: number, createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const user = await this.userService.findOneById(userId)
    const hr = await this.helpResourceService.findOneById(createEvaluationDto.hrId)
    const evaluation = new Evaluation();
    evaluation.briefs = createEvaluationDto.briefs.join(',');
    evaluation.description = createEvaluationDto.description;
    evaluation.ratingScore = createEvaluationDto.ratingScore;
    evaluation.hr = hr;
    evaluation.user = user
    evaluation.targetUserId = createEvaluationDto.targetUserId

    const createdEvaluation = await this.evaluationsRepository.save(evaluation);
    return createdEvaluation;
  }

  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationsRepository.find();
  }

  async findOne(id: number): Promise<Evaluation> {
    return await this.evaluationsRepository.findOne({ where: { id } });
  }

  async findAllByUserId(userId: number) {
    return await this.evaluationsRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['hr']
    })
  }

  async update(
    id: number,
    updateEvaluationDto: CreateEvaluationDto,
  ): Promise<Evaluation> {
    const evaluation = await this.findOne(id);
    evaluation.briefs = updateEvaluationDto.briefs.join(', ');
    evaluation.description = updateEvaluationDto.description;
    evaluation.ratingScore = updateEvaluationDto.ratingScore;

    const updatedEvaluation = await this.evaluationsRepository.save(
      evaluation,
    );
    return updatedEvaluation;
  }

  async remove(id: number): Promise<void> {
    await this.evaluationsRepository.delete(id);
  }
}

