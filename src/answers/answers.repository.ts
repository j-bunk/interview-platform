import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  private logger = new Logger('Answer Repository');
  async createAnswer(
    questionId: number,
    answerDto: AnswerDto,
    user: User,
  ): Promise<Answer> {
    const { answerText, totalWords, wpm, time, repeatedWords, fillerWords } =
      answerDto;

    const answer = this.create({
      questionId,
      answerText,
      totalWords,
      wpm,
      time,
      repeatedWords,
      fillerWords,
      user,
    });

    try {
      await this.save(answer);
    } catch (error) {
      this.logger.error(
        `Failed to create answer for user ${
          user.username
        }, answer details: ${JSON.stringify(answerDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

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
