import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { CategoryService } from '../category/category.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    private readonly categoryService: CategoryService,
    private jwtService: JwtService,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const category = [];
    const vendor = this.vendorRepo.create(createVendorDto);
    for (let cat of createVendorDto.category) {
      category.push(await this.categoryService.findOne(cat));
    }

    return this.vendorRepo.save({ ...vendor, category });
  }

  findAll(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { orgId: number };
    const organizationID = decoded.orgId;

    return this.vendorRepo.find({
      relations: ['category', 'category.parent.organization'],
      where: { category: { parent: { organization: { id: organizationID } } } },
    });
  }

  async findOne(id: number) {
    const vendor = await this.vendorRepo.findOne({relations: ['category', 'category.parent'], where:{ id }});
    return vendor;
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.vendorRepo.findOneBy({ id });
    if (!Vendor) {
      return { error: 'Invalid Vendor ID' };
    }
    Object.assign(vendor, updateVendorDto);
    return this.vendorRepo.save(vendor);
  }

  
  async remove(id: number) {
    const vendor = await this.vendorRepo.findOneBy({ id });
    return this.vendorRepo.delete(vendor);
  }



  async getCount(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as {orgId: number};
    const currentOrgId = decoded.orgId;

    const countArr = await this.vendorRepo
  .createQueryBuilder('vendor')
  .innerJoin('vendor.category', 'category')
  .innerJoin('category.parent', 'parent')
  .innerJoin('parent.organization', 'organization')
  .select("to_char(vendor.createdAt, 'MM')", 'month')
  .addSelect('COUNT(DISTINCT  vendor.id)', 'count')
  .where('organization.id = :orgId', { orgId: currentOrgId })
  .groupBy('month')
  .getRawMany();

  const total = await this.vendorRepo.count({
    where: {
      category: { parent : {organization : {id: currentOrgId}}}}
  });

  return { countArr, total };
  }
}


