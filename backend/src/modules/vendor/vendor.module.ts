import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { CategoryModule } from '../category/category.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtCredentials } from 'src/utils/Constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    JwtModule.register(jwtCredentials),
    CategoryModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
