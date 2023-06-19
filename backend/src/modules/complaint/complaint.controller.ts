import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Headers,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ComplaintDto } from './dto/complaints.dto';
import {JwtAuthGuard} from '../../guards/jwtAuthGuard'

@UseGuards(JwtAuthGuard)
@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintService.create(createComplaintDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ComplaintDto)
  @Get()
  findAll(@Headers('Authorization') token: string, @Query('isAdmin') query : string): any {
    return this.complaintService.findAll(token, query);
  }

  @Get('/count')
  findCount(@Headers('Authorization') token: string) {
    return this.complaintService.findCount(token);
  }

 
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.complaintService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    console.log("inside")
    return this.complaintService.update(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.complaintService.remove(id);
  // }
}
