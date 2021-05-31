import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

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

  async updateAnswer(answer: Answer, answerDto: AnswerDto): Promise<Answer> {
    const { answerText, wpm, time, repeatedWords, fillerWords } = answerDto;

    answer.answerText = answerText;
    answer.wpm = wpm;
    answer.time = time;
    answer.repeatedWords = repeatedWords;
    answer.fillerWords = fillerWords;

    try {
      await this.save(answer);
    } catch (error) {
      this.logger.error(
        `Failed to update answer, answer details: ${JSON.stringify(answerDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return answer;
  }
}
