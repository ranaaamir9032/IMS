import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RequestDto } from './dto/request.dto';


@UseGuards(AuthGuard('jwt'))
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Serialize(RequestDto)
  @Get()
  findAll(@Headers('Authorization') token: string, @Query('isFaulty') query : string) {
    return this.requestService.findAll(token, query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
