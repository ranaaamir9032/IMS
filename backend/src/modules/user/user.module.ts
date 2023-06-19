import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/modules/roles/roles.module';
import { jwtCredentials } from 'src/utils/Constants/constants';



@Module({
  imports: [ RolesModule ,JwtModule.register({
    secret: "gigalabs",
    signOptions: {
      expiresIn: '30d'
    }
  }),TypeOrmModule.forFeature([User])],  
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
