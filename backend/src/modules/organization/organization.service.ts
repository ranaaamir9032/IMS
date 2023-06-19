import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsDto } from './dto/organizations.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const org = this.organizationRepo.create(createOrganizationDto);
    return await this.organizationRepo.save(org);
  }

  findAll() {
    return this.organizationRepo.find();
  }

  async findOne(id: number) {
    const org = await this.organizationRepo.findOne({
      where: { id },
    });
    return org;
  }

  async getCount() {
    const countArr = await this.organizationRepo
      .createQueryBuilder('organization')
      .select('organization.createdAt', 'month')
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('organization.createdAt')
      .getRawMany();

    countArr.map((e) => (e.month = e.month.getMonth()));

    const total = await this.organizationRepo.count();

    return { countArr, total };
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const org = await this.organizationRepo.findOneBy({ id });
    if(!Organization){
      return {error: 'Invlid Organization ID'}
    }
    Object.assign(org, updateOrganizationDto);
    return this.organizationRepo.save(org);
  }

  async remove(id: number) {
    const org = await this.organizationRepo.findOneBy({ id });
    if (!org) {
      throw new NotFoundException('not found');
    }
    return await this.organizationRepo.remove(org);
  }
}
