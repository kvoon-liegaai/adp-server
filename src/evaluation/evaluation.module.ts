import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { HelpResourceModule } from 'src/help_resource/help_resource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Evaluation
    ]),
    HelpResourceModule,
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}
