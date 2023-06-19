import { Expose, Transform } from 'class-transformer';
import { User } from 'src/modules/user/entities/user.entity';

export class ComplaintDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ value }) => value?.username)
  user: User;

  @Transform(({ obj }) => obj?.user?.organization?.name)
  @Expose()
  org: any;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  status: string;
}
