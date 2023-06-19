import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { RequestModule } from './modules/request/request.module';
import { CategoryModule } from './modules/category/category.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.local.env'}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    RolesModule,
    OrganizationModule,
    ComplaintModule,
    RequestModule,
    CategoryModule,
    VendorModule,
    ItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
