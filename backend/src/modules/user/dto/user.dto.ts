import { Expose, Transform } from 'class-transformer';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    const picture = obj.role?.role == 'employee' ? undefined : obj.picture;

    return picture;
  })
  picture: string;

  @Expose()
  username: string;

  @Expose()
  @Transform(({ obj }) => {
    const org = obj.role?.role == 'employee' ? undefined : obj.organization;
    return org;
  })
  organization: string;

  @Expose()
  email: string;

  @Expose()
  contact: string;
}
