import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateQuestionDto } from './create-question.dto';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionRepository.createQuestion(createQuestionDto);
  }
}
