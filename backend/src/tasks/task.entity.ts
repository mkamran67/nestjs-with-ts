import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  // By default postgres will give your ids numbered -> incremented -> uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // ManyToOne explained
  // 1. What property will typeorm check for
  // 2. How will typeorm check for the opposing side property
  // 3. Eager: false -> When true, queries will include the related items
  // For example, if you fetch the User the tasks will be included in User.tasks since Eager is true
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) // This will remove the user property when in plain text - printing or JSON -> using interceptors
  user: User;
}
