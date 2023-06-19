import { Category } from "src/modules/category/entities/category.entity";
import { Item } from "src/modules/item/entities/item.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
    
    @Column({nullable: true})
    contact: string;

    @ManyToMany(()=> Category, (category) => category.vendor)
    @JoinTable()
    category: Category[];

    @OneToMany(() => Item, (item) => item.vendor)
    item: Item[];

}
