import { Expose } from 'class-transformer';


export class EmployeeDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  contact: string;

  @Expose()
  picture: string;
  
}
