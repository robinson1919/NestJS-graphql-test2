  
import { Model } from 'mongoose';
import { Injectable, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CatInput } from './input/cat.input';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findOne({ _id: id });
  }

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }  
  
  async delete(id: string): Promise<Cat> {
    return await this.catModel.findByIdAndRemove(id);
  }

  async update(id: string, input: CatInput ): Promise<Cat> {
    return await this.catModel.findByIdAndUpdate(id, input, { new: true});
  }
  
}