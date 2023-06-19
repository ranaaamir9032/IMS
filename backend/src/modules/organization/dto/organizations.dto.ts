import { Expose } from 'class-transformer';

export class OrganizationsDto {
  @Expose()
  id: string;

  @Expose()
  picture: string;

  @Expose()
  name: string;
  @Expose()
  address: string;
  @Expose()
  email: string;
  @Expose()
  contact: string;
}
