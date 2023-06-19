import { Category } from 'src/modules/category/entities/category.entity';
import { Request } from 'src/modules/request/entities/request.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Vendor } from 'src/modules/vendor/entities/vendor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  sr_number: string;

  @Column({nullable: true})
  userId: number

  @ManyToOne(() => Category, (category) => category.item)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Vendor, (vendor) => vendor.item)
  @JoinColumn()
  vendor: Vendor;

  @ManyToOne(() => User, (us) => us.item)
  @JoinColumn()
  user: User;

  @OneToMany(() => Request, (req) =>req.item)
  request: Request
}
