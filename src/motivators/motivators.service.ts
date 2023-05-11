// motivator.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Motivator, MotivatorDocument } from '../entities';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { ApiFeatures } from '../utils/apiFeatures';

@Injectable()
export class MotivatorsService {
  constructor(
    @InjectModel(Motivator.name)
    private readonly motivatorModel: Model<MotivatorDocument>,
  ) {}

  async findAll(query: any): Promise<Motivator[]> {
    const features = new ApiFeatures<Motivator & Document>(
      this.motivatorModel.find(),
      query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return features.query.exec();
  }

  async findOne(id: string): Promise<Motivator> {
    return this.motivatorModel.findById(id).exec();
  }

  async create(dto: CreateMotivatorDto): Promise<Motivator> {
    const createdMotivator = new this.motivatorModel(dto);
    return createdMotivator.save();
  }

  async update(
    id: string,
    updateMotivatorDto: UpdateMotivatorDto,
  ): Promise<Motivator> {
    return this.motivatorModel
      .findByIdAndUpdate(id, updateMotivatorDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Motivator> {
    return this.motivatorModel.findByIdAndDelete(id).exec();
  }
}
