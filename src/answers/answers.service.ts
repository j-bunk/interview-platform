import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answers.repository';
import { AnswerAnalysisService } from './answer-analysis.service';

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

  async getAudioByAnswerId(id: number, user: User): Promise<string> {
    const answer = await this.answerRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return answer.audioFilePath;
  }

  async deleteAnswer(id: number, user: User): Promise<void> {
    try {
      fs.unlinkSync(
        path.join(process.cwd(), await this.getAudioByAnswerId(id, user)),
      );
    } catch (err) {
      console.error(err);
    }

    const result = await this.answerRepository.delete({ id, userId: user.id });

    if (!result.affected) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
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
