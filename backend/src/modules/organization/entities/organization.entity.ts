import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  representative: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  zip: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => User, (user) => user.organization)
  user: User;

  @OneToMany(() => Category, (category) => category.organization)
  category: Category;
}
