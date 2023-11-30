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
import { AuthGuard } from '../app.guard';
import { Request as ExpressRequest } from 'express';

@Controller('/api/user')
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
  @UseGuards(AuthGuard)
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

  @Get('me')
  @UseGuards(AuthGuard)
  async getUserData(@Request() req: ExpressRequest) {
    const { userId } = req.params;
    return await this.userService.getUserData(userId);
  }
}
