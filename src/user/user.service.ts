import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import { createUserDto, loginDto } from 'src/dtos/user.dto';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(providerKeys.userProvider) private userService: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Promise<string> {
    return;
  }

  async createAccount(createUserDto: createUserDto) {
    // rest of code ...
  }
  async login(loginDto: loginDto) {
    // rest of code ...
  }
}
