import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column()
  sampleAnswer: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
