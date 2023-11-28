import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import { createUserDto, loginDto } from 'src/dtos/user.dto';
import { IUser } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(providerKeys.userProvider) private userService: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );
    return hashedPassword;
  }
  async comparePassword({
    hashedPassword,
    password,
  }: {
    hashedPassword: string;
    password: string;
  }): Promise<boolean> {
    const decodedPassword = await bcrypt.compare(password, hashedPassword);
    return decodedPassword;
  }

  async createAccount(
    createUserDto: createUserDto,
  ): Promise<{ message: string; token: string }> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await new this.userService({
        ...createUserDto,
        password: hashedPassword,
      });
      await user.save();
      const token = await this.jwtService.signAsync(
        { _id: user._id },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '24h' },
      );
      return {
        message: `welcome ${user.displayName} to your awesome chat app ,enjoy with us`,
        token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async login(loginDto: loginDto) {
    try {
      const user = await this.userService.findOne({ email: loginDto.email });

      if (!user) {
        throw new NotFoundException();
      }

      const compareResult = await this.comparePassword({
        hashedPassword: user.password,
        password: loginDto.password,
      });
      if (compareResult) {
        const token = await this.jwtService.sign(
          { _id: user._id },
          { secret: process.env.JWT_SECRET_KEY, expiresIn: '24h' },
        );
        return { message: `welcome back ,${user.username}`, token };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
