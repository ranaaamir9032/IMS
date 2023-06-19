import { Expose, Transform } from 'class-transformer';


export class VendorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  contact: string;

  @Expose()
  @Transform(({ obj }) => obj?.category[0]?.parent.name)
  Category: string;

  @Expose()
  @Transform(({obj}) => obj?.category[0]?.name)
  SubCategory: string;

 
}
