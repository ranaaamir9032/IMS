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
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoriesDto } from './dto/categorie.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Serialize(CategoriesDto)
  @Get()
  findAll(@Headers('Authorization') token: string) {
    return this.categoryService.findAll(token);
  }

  @Get('/all')
  findAllWithVendors(@Headers('Authorization') token: string) {
    return this.categoryService.findAll(token);
  }

  @Get('/count')
  getCount(@Headers('Authorization') token: string) {
    return this.categoryService.getCount(token);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }

}
