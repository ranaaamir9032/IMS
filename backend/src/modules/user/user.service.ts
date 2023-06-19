import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { otp } from 'src/utils/generateOtp';
import { ProfileDto } from './dto/create-profile.dto';
import { notifyByEmail } from 'src/utils/emailNotification';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();

    const user = this.userRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, salt),
    });
    return this.userRepo.save(user);
  }

  // Login User
  async login(user: User): Promise<any> {
    const { email, password } = user;
    const userExists = await this.userRepo.findOne({
      where: { email },
      relations: { role: true, organization: true },
    });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = this.generateToken(
        userExists.id,
        userExists.role.role,
        userExists?.organization?.id,
      );
      return { user: userExists, token };
    } else {
      return { error: 'Credentials did not match' };
    }
  }

  // User Profile
  async editProfile(id: number, profileDto: ProfileDto) {
    const user = await this.userRepo.findOneBy({ id });
    Object.assign(user, profileDto);
    return this.userRepo.save(user);
  }

  // get all the created users
  async findAll(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as { role: string };
    const currentUser = decoded.role;
    if (currentUser === 'superadmin') {
      return this.userRepo.find({
        relations: ['organization', 'role'],
        where: { role: { role: 'admin' } },
      });
    } else if (currentUser === 'admin') {
      return this.userRepo.find({
        relations: ['organization', 'role'],
        where: { role: { role: 'employee' } },
      });
    }
    return this.userRepo.find({
      relations: ['organization', 'role'],
      where: { role: { role: 'admin' } },
    });
  }

  // get user by ID
  findOne(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
      relations: [ 'organization', 'role','request', 'item', 'item.category', 'item.category.parent'],
    });
  }

  async getCount(token: string) {
    const myToken = token.substring(7);
    const decoded = this.jwtService.decode(myToken) as {
      role: string;
      orgId: number;
    };
    const currentRole = decoded.role;
    const currentOrgId = decoded.orgId;

    if (currentRole === 'superadmin') {
      const countArr = await this.userRepo
        .createQueryBuilder('user')
        .select("to_char(user.createdAt, 'MM')", 'month')
        .addSelect('COUNT(*)', 'count')
        .where('user.roleId = 2')
        .groupBy('month')
        .getRawMany();


      const total = await this.userRepo.count({
        where: { role: { role: 'admin' } },
      });

      return { countArr, total };
    } else {
      const countArr = await this.userRepo
        .createQueryBuilder('user')
        .select("to_char(user.createdAt, 'MM')", 'month')
        .addSelect('COUNT(*)', 'count')
        .where('user.roleId = 3')
        .andWhere('user.organizationId = :orgId', { orgId: currentOrgId })
        .groupBy('month')
        .getRawMany();

      const total = await this.userRepo.count({
        where: {
          organization: { id: currentOrgId },
          role: { role: 'employee' },
        },
      });

      return { countArr, total };
    }
  }

  // update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      return { error: 'Invalid User ID' };
    }
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  // Delete user
  remove(id: string) {
    return this.userRepo.delete(id);
  }

  generateToken(id: number, role: string, orgId: number) {
    const payload = { id, role, orgId };
    return this.jwtService.sign(payload);
  }

  //  Sending otp on user's mail
  async sendOTP(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    user.otp = otp();
    await this.userRepo.save(user);

    const message = 'Your OTP for password reset is: ' + otp();
    const subj = 'OTP for password reset';
    return notifyByEmail(email, subj, message);
  }

  // Reset Password
  async resetPassword(otp: number, email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    const salt = await bcrypt.genSalt();

    if (otp === user.otp) {
      user.password = await bcrypt.hash(password, salt);
      user.otp = null;
      await this.userRepo.save(user);

      return 'Password changed successfully';
    } else {
      return 'OTP did not match';
    }
  }
}
