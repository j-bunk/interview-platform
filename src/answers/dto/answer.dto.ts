import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AnswerDto {
  @IsNotEmpty()
  @IsString()
  answerText: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  totalWords: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value))
  time: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value))
  wpm: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  repeatedWords: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fillerWords: string[];
}
