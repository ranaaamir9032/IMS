import { Expose, Transform } from 'class-transformer';
import { Category } from 'src/modules/category/entities/category.entity';

export class ItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Transform(({ obj }) => obj?.category?.parent?.name)
  @Expose()
  category: any;

  @Transform(({ obj }) => obj.category?.name)
  @Expose()
  subCategory: Category;

  @Transform(({obj}) => obj?.user ? obj?.user?.username : 'unassigned')
  @Expose()
  user: string

  @Expose()
  price: string;
}
