import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findAll(query: any = {}): Promise<Motivator[]> {
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
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const motivator = await this.motivatorModel.findById(id).exec();
    if (!motivator) {
      throw new NotFoundException('Motivator not found');
    }

    return motivator;
  }

  async create(dto: CreateMotivatorDto, userId): Promise<Motivator> {
    const createdMotivator = await this.motivatorModel.create({
      author: userId,
      ...dto,
    });
    return createdMotivator;
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
