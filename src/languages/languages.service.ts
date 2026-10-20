import {
 
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Language } from '../database/core/entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { errorCodes } from '../utils/db-errors';



@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createLanguage: CreateLanguageDto): Promise<Language> {
    try{

      const languageModel = this.languageRepository.create(createLanguage);
      return await this.languageRepository.save(languageModel);
    }catch(e){

      if(e instanceof QueryFailedError){
        const driverError=e.driverError as {code?:string}
        if(driverError.code == errorCodes.DUPLICATE_REQUEST){
          throw new HttpException(
            "Language with that name already exists",
            HttpStatus.CONFLICT
          )
        }

        throw new HttpException(
          'Some error has happened',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new Error("Failed Request");
      
      
    }
     
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
