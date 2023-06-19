import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { Jwtstrategy } from './jwt.strategy';

// import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule,UserModule],
  providers: [Jwtstrategy],
})
export class AuthModule {}
