import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { startOfDay, endOfDay } from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User, UserDocument } from '../entities';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { ApiFeatures, QueryString } from '../utils/apiFeatures';
import { Place, VoteKind, VoteMethod } from 'src/utils/enums';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class MotivatorsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Motivator.name)
    private readonly motivatorModel: Model<MotivatorDocument>,
  ) {}

  async countAllMotivators(place: Place): Promise<number> {
    return this.motivatorModel.countDocuments({ place });
  }

  async findAllMotivators(
    place: Place,
    queryString: QueryString,
  ): Promise<{ motivators: Motivator[]; count: number }> {
    const features = new ApiFeatures<Motivator & Document>(
      this.motivatorModel.find({ place }),
      queryString,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const motivators = await features.query.exec();
    const count = await this.countAllMotivators(place);

    return { motivators, count };
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
    cloudinary.config({
      cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
      api_key: `${process.env.CLOUDINARY_API_KEY}`,
      api_secret: `${process.env.CLOUDINARY_SECRET}`,
    });

    const motivatorToDelete = await this.motivatorModel.findById(id);
    if (!motivatorToDelete) {
      throw new NotFoundException(`Motivator with ID ${id} not found`);
    }

    const imageUrlParts = motivatorToDelete.image.split('/');
    const imageNameWithExtension = imageUrlParts[imageUrlParts.length - 1];
    const imageName = imageNameWithExtension.split('.')[0];

    await cloudinary.uploader.destroy(imageName, {
      resource_type: 'image',
    });

    const deletedMotivator = await motivatorToDelete.deleteOne();

    return deletedMotivator;
  }

  async checkVoteConditions(
    id: string,
    user: User,
    option: VoteKind,
    method: VoteMethod,
  ): Promise<Motivator> {
    const motivator = await this.motivatorModel.findById(id).exec();

    if (!motivator) {
      throw new NotFoundException(`Motivator with id ${id} not found`);
    }

    if (method === VoteMethod.take) {
      if (option === VoteKind.like && !motivator.like.includes(user._id)) {
        throw new ForbiddenException(
          `You've already disliked this motivator. Click dislike to undo your vote.`,
        );
      }
      if (
        option === VoteKind.dislike &&
        !motivator.dislike.includes(user._id)
      ) {
        throw new ForbiddenException(
          `You've already liked this motivator. Click like to undo your vote.`,
        );
      }
    }

    return motivator;
  }

  async vote(
    id: string,
    user: User,
    option: VoteKind,
    method: VoteMethod,
  ): Promise<Motivator> {
    await this.checkVoteConditions(id, user, option, method);

    let updatedMotivator = await this.motivatorModel
      .findByIdAndUpdate(
        id,
        {
          [`$${method}`]: { [`${option}`]: user },
        },
        { new: true },
      )
      .exec();

    if (updatedMotivator && updatedMotivator.like.length === 2) {
      updatedMotivator = await this.motivatorModel
        .findByIdAndUpdate(
          id,
          { place: Place.main, movedToMain: Date.now() },
          { new: true },
        )
        .exec();
    }

    return updatedMotivator;
  }

  async acceptToStaging(motivatorId: string): Promise<Motivator> {
    const updatedMotivator = await this.motivatorModel.findByIdAndUpdate(
      motivatorId,
      { place: `${Place.staging}`, accepted: Date.now() },
      { new: true, runValidators: true },
    );
    return updatedMotivator;
  }

  async motivatorsInfo(): Promise<{
    motivatorsNumber: number;
    usersNumber: number;
    motivatorsToday: number;
  }> {
    const motivatorsNumber = await this.motivatorModel.countDocuments();
    const usersNumber = await this.userModel.countDocuments();

    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    const motivatorsToday = await this.motivatorModel.countDocuments({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });
    return { motivatorsNumber, usersNumber, motivatorsToday };
  }
}
