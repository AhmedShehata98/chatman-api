import { Controller, Body, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, loginDto } from 'src/dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseInterceptors(FileInterceptor(''))
  async login(@Body() loginDto: loginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('signup')
  async searchUsers(@Body() createUserDto: createUserDto) {
    return await this.userService.createAccount(createUserDto);
  }
}
