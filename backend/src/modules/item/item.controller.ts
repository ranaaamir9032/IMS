import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Request } from 'express';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ItemDto } from './dto/items.dto';

@UseGuards(AuthGuard('jwt')) // Checks user token for each controller function
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Serialize(ItemDto)
  @Get()
  findAll(@Headers('Authorization') token: string) {
    return this.itemService.findAll(token);
  }

  @Get('/count')
  getCount(@Headers('Authorization') token: string) {
    return this.itemService.getCount(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }

  
}
