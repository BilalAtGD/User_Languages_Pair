import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/core/entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { randomBytes, scrypt } from 'crypto';
import { SignInDto } from './dto/signin-dto';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
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
      role: existing.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async signUp(createUser: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: createUser.email },
    });
    if (existing) {
      throw new ConflictException(
        `User with the email ${existing.email} already exists`,
      );
    }

    const salt = randomBytes(8).toString('hex');

    const hash = await new Promise<Buffer>((resolve, reject) => {
      scrypt(createUser.password, salt, 32, (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      });
    });

    const result = salt + '.' + hash.toString('hex');
    createUser.password = result;

    const user = this.userRepository.create(createUser);

    const returnedUser = await this.userRepository.save(user);

    

    return returnedUser;
  }

  async update(id: number, updatedData: UpdateUserDto): Promise<User> {
    const user = await this.getOne(id);
    if(updatedData.name){
      user.name = updatedData.name;
    }
    
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.getOne(id);
    await this.userRepository.remove(user);
  }
}
