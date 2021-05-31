import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';

export const storage = {
  storage: diskStorage({
    destination: './uploads/recordings',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Get('/audio/:id')
  async getAudioByAnswerId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Res() res,
  ): Promise<Answer> {
    this.logger.verbose(
      `User "${user.username}" retrieving audio for answer #${id}`,
    );

    return res.sendFile(
      path.join(
        process.cwd(),
        await this.answersService.getAudioByAnswerId(id, user),
      ),
    );
  }

  @Post('/upload/:questionid')
  @UseInterceptors(FileInterceptor('audio', storage))
  createAnswer(
    @Param('questionid', ParseIntPipe) questionId: number,
    @UploadedFile() audioFile: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<Answer> {
    return this.answersService.createAnswer(audioFile.path, questionId, user);
  }

  @Delete('/:id')
  async deleteAnswerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.answersService.deleteAnswer(id, user);
  }
}
