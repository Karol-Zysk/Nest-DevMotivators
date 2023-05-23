import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User } from '../entities';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { ApiFeatures, QueryString } from '../utils/apiFeatures';
import { Place, VoteKind, VoteMethod } from 'src/utils/enums';

@Injectable()
export class MotivatorsService {
  constructor(
    @InjectModel(Motivator.name)
    private readonly motivatorModel: Model<MotivatorDocument>,
  ) {}

  async findAllMotivators(
    place: Place,
    queryString: QueryString,
  ): Promise<Motivator[]> {
    const features = new ApiFeatures<Motivator & Document>(
      this.motivatorModel.find({ place }),
      queryString,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return features.query.exec();
  }

  async findMotivatorById(id: string): Promise<Motivator> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const motivator = await this.motivatorModel.findById(id).exec();
    if (!motivator) {
      throw new NotFoundException('Motivator not found');
    }

    return motivator;
  }

  async createMotivator(
    dto: CreateMotivatorDto,
    user: User,
  ): Promise<Motivator> {
    const createdMotivator = await this.motivatorModel.create({
      author: user._id,
      ...dto,
      authorName: user.login,
    });
    return createdMotivator;
  }

  async updateMotivator(
    id: string,
    updateMotivatorDto: UpdateMotivatorDto,
  ): Promise<Motivator> {
    return this.motivatorModel
      .findByIdAndUpdate(id, updateMotivatorDto, { new: true })
      .exec();
  }

  async deleteMotivator(id: string): Promise<Motivator> {
    const deletedMotivator = await this.motivatorModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedMotivator) {
      throw new NotFoundException(`Motivator with ID ${id} not found`);
    }

    return;
  }

  async vote(
    id: string,
    userId: User,
    option: VoteKind,
    method: VoteMethod,
  ): Promise<Motivator> {
    let motivator = await this.motivatorModel
      .findByIdAndUpdate(
        id,
        {
          [`$${method}`]: { [`${option}`]: userId },
          movedToMain: Date.now(),
        },
        { new: true, runValidators: true },
      )
      .exec();

    if (motivator && motivator.like.length === 2) {
      motivator = await this.motivatorModel
        .findByIdAndUpdate(
          id,
          { place: Place.main },
          { new: true, runValidators: true },
        )
        .exec();
    }

    return motivator;
  }

  async acceptToStaging(motivatorId: string): Promise<Motivator> {
    const updatedMotivator = await this.motivatorModel.findByIdAndUpdate(
      motivatorId,
      { place: `${Place.staging}`, accepted: Date.now() },
      { new: true, runValidators: true },
    );
    return updatedMotivator;
  }
}
