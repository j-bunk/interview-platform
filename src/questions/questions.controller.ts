import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { CreateQuestionDto } from './create-question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  private logger = new Logger('Questions Controller');
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  @Get('/:id')
  getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    this.logger.verbose(
      `Question created, data: ${JSON.stringify(createQuestionDto)}`,
    );
    return this.questionsService.createQuestion(createQuestionDto);
  }
}
