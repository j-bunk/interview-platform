import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
  private logger = new Logger('Answers Controller');
  constructor(private answersService: AnswersService) {}

  @Get('/:id')
  getAnswerById(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
    return this.answersService.getAnswerById(id);
  }

  @Patch('/:id/answer')
  @UsePipes(ValidationPipe)
  updateAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() answerDto: AnswerDto,
  ): Promise<Answer> {
    return this.answersService.updateAnswer(id, answerDto);
  }

  @Post('/:questionid')
  @UsePipes(ValidationPipe)
  createAnswer(
    @Param('questionid', ParseIntPipe) questionId: number,
    @Body() answerDto: AnswerDto,
  ): Promise<Answer> {
    return this.answersService.createAnswer(questionId, answerDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.answersService.deleteAnswer(id);
  }
}
