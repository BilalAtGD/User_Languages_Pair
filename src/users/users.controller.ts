import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserResponseDto } from './dto/user-responce-dto';
import { plainToInstance } from 'class-transformer';
import { SignInDto } from './dto/signin-dto';
import { AuthGuard } from '../guards/auth-guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  @ApiOperation({
    description : "Create a new User"
  })
  async signUp(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.signUp(createUser);
    return plainToInstance(UserResponseDto, user);
  }

  @ApiOperation({
    description : "SignIn to a user account"
  })
  @Post('/signin')
  async signIn(@Body() signInRequest: SignInDto): Promise<string> {
    const accessToken = await this.userService.signIn(signInRequest);
    return accessToken;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get all users',
  })
  async getAll(): Promise<UserResponseDto[]> {
    const User = await this.userService.getAll();
    return plainToInstance(UserResponseDto, User);
  }

  @Get(':id')
  @ApiOperation({
    description:"Get one user"
  })
  @UseGuards(AuthGuard)
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: express.Request,
  ): Promise<UserResponseDto> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== id) {
      throw new BadRequestException('You are not allowed to see this user');
    }
    const user = await this.userService.getOne(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Patch(':id')
  @ApiOperation({description:"Update User Profile"})
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateUserDto,
    @Req() req: express.Request,
  ) {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== id) {
      throw new BadRequestException('You are not allowed to change this user');
    }
    const user = await this.userService.update(id, updatedData);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  @ApiOperation({
    description:"Delete user by id"
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: express.Request,
  ): Promise<void> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== id) {
      throw new BadRequestException('You are not allowed to delete this user');
    }
    return await this.userService.remove(id);
  }
}
