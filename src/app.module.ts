import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersModule } from './answers/answers.module';
import { typeOrmConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AnswersModule,
    QuestionsModule,
  ],
})
export class AppModule {}
