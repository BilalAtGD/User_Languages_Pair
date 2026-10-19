import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguage } from '../../database/core/entities/user-language.entity';
import { AssignLanguageDto } from './dto/assign-language.dto';
import { Language } from '../../database/core/entities/language.entity';

@Injectable()
export class UserLanguagesService {
  constructor(
    @InjectRepository(UserLanguage)
    private readonly userLanguageRepository: Repository<UserLanguage>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async create(
    userId: number,
    assignLanguageDto: AssignLanguageDto,
  ): Promise<UserLanguage> {
    const language = await this.languageRepository.findOne({
      where: { id: assignLanguageDto.languageId },
    });

    if (!language) {
      throw new NotFoundException('There is no language with this specific id');
    }
    const userLanguage = this.userLanguageRepository.create({
      userId,
      languageId: assignLanguageDto.languageId,
    });

    return this.userLanguageRepository.save(userLanguage);
  }

  async remove(userId: number, languageId: number): Promise<void> {
    const result = await this.userLanguageRepository.delete({
      userId: userId,
      languageId: languageId,
    });
    if (!result.affected) {
      throw new NotFoundException('This pair does not exist');
    }
  }

  async getAll(userId: number): Promise<UserLanguage[]> {
    const userLanguages = await this.userLanguageRepository.find({
      where: { userId: userId },
    });
    console.log(userLanguages);
    return userLanguages;
  }
  async getOne(userId: number, languageId: number): Promise<UserLanguage[]> {
    const userLanguages = await this.userLanguageRepository.find({
      where: { userId: userId, languageId: languageId },
      relations: {
        language: true,
      },
    });
    console.log(userLanguages);
    return userLanguages;
  }
}
