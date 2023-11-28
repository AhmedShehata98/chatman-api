import { Controller, Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, loginDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('signup')
  async searchUsers(@Body() createUserDto: createUserDto) {
    return await this.userService.createAccount(createUserDto);
  }
}
