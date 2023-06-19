import { Module } from '@nestjs/common';
import { Request } from './entities/request.entity';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'gigalabs',
      signOptions: {
        expiresIn: '30d',
      },
    }),
    TypeOrmModule.forFeature([Request]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
