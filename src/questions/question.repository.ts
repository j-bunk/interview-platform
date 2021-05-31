import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CreateQuestionDto } from './dtos/create-question.dto';

import { Question } from './question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  private logger = new Logger('Question Repository');

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const { questionText, sampleAnswer } = createQuestionDto;

    const question: Question = new Question();
    question.questionText = questionText;
    question.sampleAnswer = sampleAnswer;

    try {
      await this.save(question);
    } catch (error) {
      this.logger.error(
        `Failed to create question, question details: ${JSON.stringify(
          createQuestionDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return question;
  }
}
