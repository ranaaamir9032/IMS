import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  suggestion: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.complaint)
  user: User;
}
