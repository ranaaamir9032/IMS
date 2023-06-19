import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complainRepo: Repository<Complaint>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  create(createComplaintDto: CreateComplaintDto) {
    const complain = this.complainRepo.create(createComplaintDto);
    return this.complainRepo.save(complain);
  }

  async findAll(token: string, query: string): Promise<any> {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as {
      role: string;
      id: number;
    };
    const userRole = decoded.role;
    const userId = decoded.id;
    const user = await this.userService.findOne(userId);

    if (userRole === 'admin') {
      const role = query === 'true' ? 'admin' : 'employee';
      return this.complainRepo.find({
        relations: ['user', 'user.organization', 'user.role'],
        where: {
          user: {
            organization: { id: user.organization.id },
            role: { role: role },
          },
        },
        order: { createdAt: 'DESC' },
      });
    } else if (userRole === 'superadmin') {
      const result = await this.complainRepo.find({
        relations: ['user', 'user.organization'],
        where: { user: { role: { role: 'admin' } } },
        order: { createdAt: 'DESC' },
      });
      return result;
    } else if (userRole === 'employee') {
      const result = await this.complainRepo.find({
        relations: ['user'],
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' },
      });
      return result;
    }
  }

  async findOne(id: number) {
    return this.complainRepo.findOne({
      relations: ['user', 'user.organization', 'user.role'],
      where: { id },
    });
  }

  async findCount(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as {
      role: string;
      orgId: number;
    };
    const currentOrgId = decoded.orgId;
    const currentRole = decoded.role;

    if (currentRole === 'superadmin') {
      const complaintCount = await this.complainRepo
        .createQueryBuilder('complaint')
        .innerJoin('complaint.user', 'user')
        .select("to_char(complaint.createdAt, 'MM')", 'month')
        .addSelect('COUNT(*)', 'count')
        .addSelect(
          'COUNT(CASE WHEN complaint.status = :pendingStatus THEN 1 END)',
          'pending',
        )
        .addSelect(
          'COUNT(CASE WHEN complaint.status = :resolvedStatus THEN 1 END)',
          'resolved',
        )
        .where('user.role = :userRole', { userRole: 2 })
        .groupBy('month')
        .setParameter('pendingStatus', 'Pending')
        .setParameter('resolvedStatus', 'Resolved')
        .getRawMany();

      const totalPending = await this.complainRepo.count({
        relations: { user: true },
        where: { user: { role: { role: 'admin' } }, status: 'Pending' },
      });

      const totalResolved = await this.complainRepo.count({
        relations: { user: true },
        where: { user: { role: { role: 'admin' } }, status: 'Resolved' },
      });

      return { complaintCount, totalPending, totalResolved };
    } else {
      const countArr = await this.complainRepo
        .createQueryBuilder('complaint')
        .innerJoin('complaint.user', 'user')
        .innerJoin('user.organization', 'organization')
        .select("to_char(complaint.createdAt, 'MM')", 'month')
        .addSelect('COUNT(*)', 'count')
        .addSelect(
          'COUNT(CASE WHEN complaint.status = :pendingStatus THEN 1 END)',
          'pending',
        )
        .addSelect(
          'COUNT(CASE WHEN complaint.status = :resolvedStatus THEN 1 END)',
          'resolved',
        )
        .where('organization.id = :orgId', { orgId: currentOrgId })
        .andWhere('user.role = :userRole', { userRole: 3 })
        .groupBy('month')
        .setParameter('pendingStatus', 'Pending')
        .setParameter('resolvedStatus', 'Resolved')
        .getRawMany();

      const transformedResult = countArr.map((entry) => ({
        month: entry.month,
        count: parseInt(entry.count),
        pending: parseInt(entry.pending),
        resolved: parseInt(entry.resolved),
      }));
      return transformedResult;
    }
  }

  async update(id: number) {
    const complain = await this.complainRepo.findOneBy({ id });
    if (!complain) {
      return { error: 'Invalid Complain ID' };
    }
    complain.status = 'Resolved';
    return this.complainRepo.save(complain);
  }

  async remove(id: number) {
    const complain = await this.complainRepo.findOneBy({ id });
    return this.complainRepo.delete(complain);
  }
}
