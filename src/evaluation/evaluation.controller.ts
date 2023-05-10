import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async create(@Body() createEvaluationDto: CreateEvaluationDto, @Req() req: any) {
    const userId = Number(req.user.id)
    return await this.evaluationService.create(userId, createEvaluationDto);
  }

  @Get()
  async findAllEvaluation(@Req() req) {
    return await this.evaluationService.findAllByUserId(req.user.id)
  }

  // @Get()
  // findAll() {
  //   return this.evaluationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.evaluationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
  //   return this.evaluationService.update(+id, updateEvaluationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.evaluationService.remove(+id);
  // }
}
