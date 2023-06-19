import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtCredentials } from 'src/utils/Constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint]),JwtModule.register(jwtCredentials) ,UserModule],
  controllers: [ComplaintController],
  providers: [ComplaintService]
})
export class ComplaintModule {}
