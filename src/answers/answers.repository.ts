import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  private logger = new Logger('Answer Repository');
  async createAnswer(
    answer: Answer,
    audioFilePath: string,
    questionId: number,
    user: User,
  ): Promise<Answer> {
    answer.user = user;
    answer.questionId = questionId;
    answer.audioFilePath = audioFilePath;

    try {
      await this.save(answer);
    } catch (error) {
      this.logger.error(
        `Failed to create answer for user ${user.username}, error details:`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete answer.user;
    return answer;
  }
}
