import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Headers,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { EmployeeDto } from './dto/employee.dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() user: User): Promise<any> {
    return this.userService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(UserDto)
  @Get()
  async getUser(@Headers('Authorization') token: string) {
 
    const users = await this.userService.findAll(token);
    return users.map((user) => ({
      ...user,
      organization: user.organization.name,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/profile/:id')
  editProfile(@Param('id') id: number, profileDto: ProfileDto) {
    return this.userService.editProfile(id, profileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/count')
  getCount(@Headers('Authorization') token: string) {
    return this.userService.getCount(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

 

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/otp')
  sendOtp(@Body() body: any): Promise<any> {
    return this.userService.sendOTP(body.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/reset')
  resetPassword(@Body() body: any) {
    return this.userService.resetPassword(body.otp, body.email, body.password);
  }
}
