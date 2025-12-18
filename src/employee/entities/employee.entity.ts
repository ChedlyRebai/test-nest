import { ObjectId } from 'mongodb';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  hourlyRate: number;
}
