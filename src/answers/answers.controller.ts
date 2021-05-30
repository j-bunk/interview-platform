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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
@UseGuards(AuthGuard())
export class AnswersController {
  private logger = new Logger('Answers Controller');
  constructor(private answersService: AnswersService) {}

  @Get('/:id')
  getAnswerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Answer> {
    return this.answersService.getAnswerById(id, user);
  }

  @Patch('/:id/answer')
  updateAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() answerDto: AnswerDto,
    @GetUser() user: User,
  ): Promise<Answer> {
    return this.answersService.updateAnswer(id, answerDto, user);
  }

  @Post('/:questionid')
  createAnswer(
    @Param('questionid', ParseIntPipe) questionId: number,
    @Body() answerDto: AnswerDto,
    @GetUser() user: User,
  ): Promise<Answer> {
    return this.answersService.createAnswer(questionId, answerDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.answersService.deleteAnswer(id, user);
  }
}
