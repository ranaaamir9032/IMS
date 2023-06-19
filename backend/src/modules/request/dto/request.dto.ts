import { Expose, Transform } from 'class-transformer';
import { Item } from 'src/modules/item/entities/item.entity';

export class RequestDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    const user = obj.user?.role === 3 ? undefined : obj.user?.username;
    return user;
  })
  user: string;

  @Transform(({ obj }) => obj?.item?.name)
  @Expose()
  item: string;

  @Transform(({ obj }) => obj?.item?.category?.parent?.name)
  @Expose()
  category: string;

  @Transform(({ obj }) => obj?.item?.category?.name)
  @Expose()
  subCategory: string;

  @Transform(({ obj }) =>
    obj?.type == 'inventory acquisition'
      ? obj?.type
      : obj?.type !== 'inventory acquisition' && obj?.return_type == null
      ? '---'
      : obj?.return_type,
  )
  @Expose()
  type: string;

  @Expose()
  createdAt: Date;

  @Expose()
  status: string;
}
