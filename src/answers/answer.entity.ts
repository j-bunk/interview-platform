import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from '../questions/question.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;

  @Column()
  questionId: number;

  @Column()
  answerText: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  answeredAt: string;

  @Column()
  totalWords: number;

  @Column()
  time: number;

  @Column()
  wpm: number;

  @Column()
  repeatedWords: string[];

  @Column()
  fillerWords: string[];
}
