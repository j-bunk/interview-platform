import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionRepository } from './question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
})
export class QuestionsModule {}
