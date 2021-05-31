import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { AnswerAnalysisService } from './answer-analysis.service';
import { AnswersController } from './answers.controller';
import { AnswerRepository } from './answers.repository';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository]), AuthModule],
  controllers: [AnswersController],
  providers: [AnswersService, AnswerAnalysisService],
})
export class AnswersModule {}
