import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    private jwtService: JwtService,
  ) {}

  create(createItemDto: CreateItemDto) {
    const item = this.itemRepo.create(createItemDto);
    return this.itemRepo.save(item);
  }

  findAll(token: string): Promise<Item[]> {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { orgId: number };
    const currentOrganization = decoded.orgId;

    return this.itemRepo.find({
      relations: [
        'category',
        'category.parent.organization',
        'category.parent',
        'user'
      ],
      where: {
        category: { parent: { organization: { id: currentOrganization } } },
      },
    });
  }

  findOne(id: number) {
    const item = this.itemRepo.findOne({
      where: { id },
      relations: ['vendor', 'user'],
    });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) {
      return { error: 'Invalid Item ID' };
    }
    Object.assign(item, updateItemDto);
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.itemRepo.findOneBy({ id });
    return this.itemRepo.delete(item);
  }

  async getCount(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { orgId: number };
    const currentOrgId = decoded.orgId;

    const countArr = await this.itemRepo
      .createQueryBuilder('item')
      .innerJoin('item.category', 'category')
      .innerJoin('category.parent', 'parent')
      .innerJoin('parent.organization', 'organization')
      .select("to_char(item.createdAt, 'MM')", 'month')
      .addSelect('COUNT(*)', 'count')
      .addSelect(
        'COUNT(CASE WHEN item.status = :assignedStatus THEN 1 END)',
        'assigned',
      )
      .addSelect(
        'COUNT(CASE WHEN item.status = :unassignedStatus THEN 1 END)',
        'unassigned',
      )
      .where('organization.id = :orgId', { orgId: currentOrgId })
      .groupBy('month')
      .setParameter('assignedStatus', 'assigned')
      .setParameter('unassignedStatus', 'unassigned')
      .getRawMany();

    const transformedResult = countArr.map((entry) => ({
      month: entry.month,
      count: parseInt(entry.count),
      assigned: parseInt(entry.assigned),
      unassigned: parseInt(entry.unassigned),
    }));

    const total = await this.itemRepo.count({
      where: {
        category: { parent: { organization: { id: currentOrgId } } },
      },
    });

    return { countArr, total };
  }
}
