import { Module } from '@nestjs/common';

import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [AnswersModule, QuestionsModule],
})
export class AppModule {}
