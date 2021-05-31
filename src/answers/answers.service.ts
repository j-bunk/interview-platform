import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answers.repository';
import { AnswerAnalysisService } from './answer-analysis.service';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerRepository)
    private answerRepository: AnswerRepository,
    private answerAnalysisService: AnswerAnalysisService,
  ) {}

  async getAnswerById(id: number, user: User): Promise<Answer> {
    const found = await this.answerRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return found;
  }

  async deleteAnswer(id: number, user: User): Promise<void> {
    const result = await this.answerRepository.delete({ id, userId: user.id });

    if (!result.affected) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
  }

  async updateAnswer(
    id: number,
    answerDto: AnswerDto,
    user: User,
  ): Promise<Answer> {
    const answer = await this.getAnswerById(id, user);

    return this.answerRepository.updateAnswer(answer, answerDto);
  }

  async createAnswer(
    audioFilePath: string,
    questionId: number,
    user: User,
  ): Promise<Answer> {
    const answer = await this.answerAnalysisService.audioAnalysis(
      audioFilePath,
    );

    return this.answerRepository.createAnswer(
      answer,
      audioFilePath,
      questionId,
      user,
    );
  }
}
