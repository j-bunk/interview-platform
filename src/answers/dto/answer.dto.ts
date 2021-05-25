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
  totalWords: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsNumber()
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
