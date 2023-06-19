import { Complaint } from 'src/modules/complaint/entities/complaint.entity';
import { Request } from 'src/modules/request/entities/request.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from 'src/modules/item/entities/item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  total_experience: string;

  @Column({ nullable: true })
  company_experience: string;

  @Column({ nullable: true })
  otp: number;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Organization, (organization) => organization.user)
  @JoinColumn()
  organization: Organization;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  @JoinColumn()
  complaint: Complaint;

  @OneToMany(() => Request, (request) => request.user)
  @JoinColumn()
  request: Request;

  @ManyToOne(() => Item, (item) => item.user)
  item: Item;
}
