import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { providerKeys } from 'src/constants/databaseModelsName';
import { createUserDto, loginDto } from 'src/dtos/user.dto';
import { IUser, StatusType } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  constructor(
    @Inject(providerKeys.userProvider) private userService: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  private createUsername(fullName: string): string {
    const randomId = nanoid(8);
    const username = `${slugify(fullName)}_${randomId}`;
    return username;
  }
  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );
    return hashedPassword;
  }
  private async comparePassword({
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
        username: this.createUsername(createUserDto.fullName),
        password: hashedPassword,
      });
      await user.save();
      const token = await this.jwtService.signAsync(
        { _id: user._id },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '24h' },
      );
      return {
        message: `welcome ${user.fullName} to your awesome chat app ,enjoy with us`,
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
        throw new NotFoundException('email or password is invalid');
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  async searchUser({
    userId,
    query,
  }: {
    userId: string;
    query: string;
  }): Promise<IUser[]> {
    const regex = new RegExp(query, 'ig');
    try {
      const user = await this.userService
        .find({
          $or: [
            { username: { $regex: regex } },
            { displayName: { $regex: regex } },
          ],
        })
        .select('username fullName profilePictureUrl createdAt , updatedAt');
      return query === ''
        ? []
        : user.filter((usr) => usr._id.toString() !== userId.toString());
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getUserData(userId: string): Promise<IUser> {
    try {
      const user = await this.userService
        .findById(userId)
        .select(
          'username email fullName profilePictureUrl status lastSeenDate',
        );
      if (!user) throw new NotFoundException('Oops ,User not found');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async changeUserLastSeen({
    userId,
    lastSeen,
  }: {
    userId: string;
    lastSeen: number;
  }): Promise<IUser> {
    try {
      if (!userId) throw new BadRequestException('user id is not provided');
      const user = await this.userService
        .findByIdAndUpdate(userId, { lastSeenDate: lastSeen })
        .select('lastSeenDate');
      await user.save();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async changeUserStatus({
    userId,
    status,
  }: {
    userId: string;
    status: StatusType;
  }): Promise<IUser> {
    try {
      if (!userId) throw new BadRequestException('user id is not provided');
      const user = await this.userService
        .findByIdAndUpdate(userId, { status })
        .select('status');
      await user.save();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
