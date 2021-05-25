import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';
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

  @Column('varchar', { array: true })
  repeatedWords: string[];

  @Column('varchar', { array: true })
  fillerWords: string[];

  @ManyToOne(() => User, (user) => user.answer, { eager: false })
  user: User;

  @Column()
  userId: number;
}
