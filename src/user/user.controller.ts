import {
  Controller,
  Body,
  Get,
  Post,
  UseInterceptors,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, loginDto } from 'src/dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAuth } from './user.guard';
import { Request as ExpressRequest } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseInterceptors(FileInterceptor(''))
  async login(@Body() loginDto: loginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor(''))
  async searchUsers(@Body() createUserDto: createUserDto) {
    return await this.userService.createAccount(createUserDto);
  }

  @Get('search')
  @UseGuards(UserAuth)
  async searchForUser(
    @Query('q') query: string,
    @Request() req: ExpressRequest,
  ) {
    const { userId } = req.params;
    return await this.userService.searchUser({
      userId: userId,
      query,
    });
  }
}
