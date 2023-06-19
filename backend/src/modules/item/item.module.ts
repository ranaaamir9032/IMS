import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: "gigalabs",
    signOptions: {
      expiresIn: '30d'
    }
  }),TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
