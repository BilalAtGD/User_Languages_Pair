import {
 
  ConflictException,
  Injectable,
  NotFoundException,
 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../database/core/entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';


@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createLanguage: CreateLanguageDto): Promise<Language> {
    const existing = await this.languageRepository.findOne({
      where: { name: createLanguage.name },
    });
    if (existing) {
      throw new ConflictException(
        `Language with the name ${existing.name} already exists`,
      );
    }
    const language = this.languageRepository.create(createLanguage);
    return this.languageRepository.save(language);
  }

  async getAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async getOne(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne({
      where: { id },
    });
    if (!language) {
      throw new NotFoundException(`Language with this id ${id} does not exist`);
    }
    return language;
  }

  async update(id: number, updatedData: UpdateLanguageDto): Promise<Language> {
    const language = await this.getOne(id);
    Object.assign(language, updatedData);
    return this.languageRepository.save(language);
  }

  async remove(id: number): Promise<void> {
    const language = await this.getOne(id);
    await this.languageRepository.remove(language);
  }
}
