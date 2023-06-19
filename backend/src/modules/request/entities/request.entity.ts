import { Item } from 'src/modules/item/entities/item.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({nullable: true})
  return_type: string;

  @Column()
  description: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Item, (item) => item.request)
  @JoinColumn()
  item: Item;
}
