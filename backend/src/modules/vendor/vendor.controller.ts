import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { VendorDto } from './dto/vendor.dto';


@UseGuards(AuthGuard('jwt'))
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Serialize(VendorDto)
  @Get()
  findAll(@Headers('Authorization') token: string) {
    return this.vendorService.findAll(token);
  }

  @Get('/count')
  getCount(@Headers('Authorization') token: string) {
    return this.vendorService.getCount(token);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
