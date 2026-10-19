import { BadRequestException, ConflictException, Injectable, NotFoundException, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import  { Repository } from "typeorm";
import { Language } from "../database/core/entities/language.entity";
import { CreateLanguageDto } from "./dto/create-language-dto";
import { UpdateLanguageDto } from "./dto/update-language-dto";
import express from "express"

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private LanguageRepository: Repository<Language>,
  ) {}

  async create(createLanguage: CreateLanguageDto): Promise<Language> {
    
    const existing = await this.LanguageRepository.findOne({
      where: { name: createLanguage.name },
    });
    if (existing) {
      throw new ConflictException(
        `Language with the name ${existing.name} already exists`,
      );
    }
    const language = this.LanguageRepository.create(createLanguage);
    return this.LanguageRepository.save(language);
  }

  async getAll(): Promise<Language[]> {
    return this.LanguageRepository.find();
  }

  async getOne(id: number): Promise<Language> {
    const language = await this.LanguageRepository.findOne({
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
    return this.LanguageRepository.save(language);
  }

  async remove(id: number): Promise<void> {
    
    const language = await this.getOne(id);
    await this.LanguageRepository.remove(language);
  }
}