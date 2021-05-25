import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersController } from './answers.controller';
import { AnswerRepository } from './answers.repository';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
