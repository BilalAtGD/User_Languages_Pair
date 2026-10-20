import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguage } from '../../database/core/entities/user-language.entity';
import { AssignLanguageDto } from './dto/assign-language.dto';


@Injectable()
export class UserLanguagesService {
  constructor(
    @InjectRepository(UserLanguage)
    private readonly userLanguageRepository: Repository<UserLanguage>,
    
  ) {}

  async create(
    userIdFromToken:number,
    userId: number,
    assignLanguageDto: AssignLanguageDto,
  ): Promise<UserLanguage> {

    if(userIdFromToken!=userId){
      throw new BadRequestException("You are not allowed to add languages to this user")
    }
    
    const userLanguage = this.userLanguageRepository.create({
      userId,
      languageId: assignLanguageDto.languageId,
    });

    try{

      return this.userLanguageRepository.save(userLanguage);
    }
    catch{
      throw new BadRequestException(
        "That pair already found"
      )
    }
  }

  async remove(userId: number, languageId: number,userIdFromToken:number): Promise<void> {
    if(userIdFromToken!=userId){
      throw new BadRequestException("You are not allowed to add languages to this user")
    }
    const result = await this.userLanguageRepository.delete({
      userId: userId,
      languageId: languageId,
    });
    if (!result.affected) {
      throw new NotFoundException('This pair does not exist');
    }
  }

  async getAll(userId: number,userIdFromToken:number): Promise<UserLanguage[]> {
    if(userIdFromToken!=userId){
      throw new BadRequestException("You are not allowed to add languages to this user")
    }
    return this.userLanguageRepository.find({
      where: { userId: userId },
    });
  }
  async getOne(userId: number, languageId: number,userIdFromToken:number): Promise<UserLanguage[]> {
    if(userIdFromToken!=userId){
      throw new BadRequestException("You are not allowed to add languages to this user")
    }
    return this.userLanguageRepository.find({
      where: { userId: userId, languageId: languageId },
      
    });
  }
}
