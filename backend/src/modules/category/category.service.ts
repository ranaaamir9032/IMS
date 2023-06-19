import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly jwtService: JwtService,
  ) {}

  // Create a new category and sub category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const parent = this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(parent);

    for (let i = 0; i < createCategoryDto.subcategory?.length; i++) {
      const child = this.categoryRepo.create({
        name: createCategoryDto.subcategory[i].name,
        parent,
      });
      await this.categoryRepo.save(child);
    }
    return parent;
  }

  // Find all categories based on current user's organization id
  findAll(token: string): Promise<any> {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { orgId: number };
    const orgId = decoded.orgId;

    return this.categoryRepo.find({
      relations: ['child', 'child.vendor', 'child.item'],
      where: { organization: { id: orgId } },
    });
  }

  // get single category by id
  async findOne(id: number) {
    const result = await this.categoryRepo.findOne({
      where: { id },
      relations: ['parent', 'item', 'vendor', 'child'],
    });
    let total = 0;
    let unassigned = 0;
    let assigned = 0;
    let faulty = 0;

    result?.item.forEach((i) => {
      total++;
      if (i?.status === 'assigned') {
        assigned++;
      } else if (i?.status === 'unassigned') {
        unassigned++;
      } else {
        faulty++;
      }
    });

    return { ...result, total, assigned, unassigned, faulty };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      return { error: 'Invalid Category ID' };
    }
    if (updateCategoryDto.subcategory) {
      for (let i = 0; i < updateCategoryDto.subcategory?.length; i++) {
        const child = this.categoryRepo.create({
          name: updateCategoryDto.subcategory[i].name,
          parent: category,
        });
        await this.categoryRepo.save(child);
      }
    } else {
      category.name = updateCategoryDto.name;
      await this.categoryRepo.save(category);
    }
  }

  async remove(id: number): Promise<any> {
    const category = await this.categoryRepo.findOne({where: { id }, relations: ['child']});
    if(!category){
      return {error: 'No Category Found'}
    }
    return this.categoryRepo.remove(category);
  }

  async getCount(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { orgId: number };
    const currentOrgId = decoded.orgId;

    const countArr = await this.categoryRepo
      .createQueryBuilder('category')
      .innerJoin('category.parent', 'parent')
      .innerJoin('parent.organization', 'organization')
      .select("to_char(category.createdAt, 'MM')", 'month')
      .addSelect('COUNT(DISTINCT parent.id)', 'count')
      .where('organization.id = :orgId', { orgId: currentOrgId })
      .groupBy('month')
      .getRawMany();

    const total = await this.categoryRepo.count({
      where: {
        parent: IsNull(),
        organization: { id: currentOrgId },
      },
    });

    return { countArr, total };
  }
}
