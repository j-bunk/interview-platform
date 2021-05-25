import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Answer } from './answer.entity';
import { AnswerRepository } from './answers.repository';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerRepository)
    private answerRepository: AnswerRepository,
  ) {}

  async getAnswerById(id: number): Promise<Answer> {
    const found = await this.answerRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return found;
  }

  async deleteAnswer(id: number): Promise<void> {
    const result = await this.answerRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
  }

  async updateAnswer(id: number, answerDto: AnswerDto): Promise<Answer> {
    const answer = await this.getAnswerById(id);

    return this.answerRepository.updateAnswer(answer, answerDto);
  }

  async createAnswer(
    questionId: number,
    answerDto: AnswerDto,
  ): Promise<Answer> {
    return this.answerRepository.createAnswer(questionId, answerDto);
  }
}
