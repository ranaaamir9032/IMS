import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request) private readonly reqRepo: Repository<Request>,
    private readonly jwtService: JwtService,
  ) {}

  create(createRequestDto: CreateRequestDto) {
    const request = this.reqRepo.create(createRequestDto);
    return this.reqRepo.save(request);
  }

  findAll(token: string, query: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as {
      role: string;
      orgId: number;
      id: number;
    };
    const reqType = query === 'true' ? 'faulty' : 'inventory acquisition';

    const currentOrgId = decoded.orgId;
    const role = decoded.role;
    const userId = decoded.id;

    if (role === 'admin') {
      return this.reqRepo.find({
        relations: ['user', 'user.role', 'user.organization', 'item', 'item.category', 'item.category.parent'],
        where: { user: { organization: { id: currentOrgId } }, type: reqType },
      });
    } else if (role === 'employee') {
      return this.reqRepo.find({
        relations: ['item', 'item.category', 'item.category.parent'],
        where: { user: { id: userId }, type: reqType },
      });
    }
  }

  findOne(id: number) {
    return this.reqRepo.findOne({
      where: { id },
      relations: ['user','item', 'item.category', 'item.category.parent'],
    });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const request = await this.reqRepo.findOneBy({ id });
    if (!request) {
      return { error: 'Invalid Request ID' };
    }
    Object.assign(request, updateRequestDto);
    return this.reqRepo.save(request);
  }

  async remove(id: number) {
    const request = await this.reqRepo.findOneBy({ id });
    return this.reqRepo.delete(request);
  }
}
