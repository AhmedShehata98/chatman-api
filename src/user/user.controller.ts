import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login() {
    return 'login user';
  }

  @Get()
  async searchUsers() {
    return 'search users';
  }
}
