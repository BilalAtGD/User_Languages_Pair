import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../database/core/entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { randomBytes, scrypt } from 'crypto';
import { SignInDto } from './dto/signin-dto';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { errorCodes } from '../utils/db-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signIn(signInRequest: SignInDto): Promise<string> {
    const existing = await this.userRepository.findOne({
      where: { email: signInRequest.email },
    });
    if (!existing) {
      throw new ConflictException(
        `User with the email ${signInRequest.email} not exists`,
      );
    }
    const [salt, storedHash] = existing.password.split('.');
    const hash = await new Promise<Buffer>((resolve, reject) => {
      scrypt(signInRequest.password, salt, 32, (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      });
    });
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    const payload = {
      userId: existing.id,
      email: existing.email,
    };

    return this.jwtService.signAsync(payload);
  }

  async getOne(id: number, userIdFromToken: number): Promise<User> {
    if (id !== userIdFromToken) {
      throw new BadRequestException(
        'You are not allowed to see this user account',
      );
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async signUp(createUser: CreateUserDto): Promise<User> {
    const salt = randomBytes(8).toString('hex');

    const hash = await new Promise<Buffer>((resolve, reject) => {
      scrypt(createUser.password, salt, 32, (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      });
    });

    const result = salt + '.' + hash.toString('hex');
    createUser.password = result;

    try {
      const userModel = this.userRepository.create(createUser);
      return await this.userRepository.save(userModel);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        const driverError = e.driverError as { code?: string };

        if (driverError.code === errorCodes.DUPLICATE_REQUEST) {
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.CONFLICT,
          );
        }

        throw new HttpException(
          'Some error has happened',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new Error('Failed Request');
    }
  }

  async update(
    id: number,
    updatedData: UpdateUserDto,
    userIdFromToken: number,
  ): Promise<User> {
    const user = await this.getOne(id, userIdFromToken);
    if (updatedData.name) {
      user.name = updatedData.name;
    }

    return this.userRepository.save(user);
  }

  async remove(id: number, userIdFromToken: number): Promise<void> {
    const user = await this.getOne(id, userIdFromToken);
    await this.userRepository.remove(user);
  }
}
