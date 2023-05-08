import { Module } from '@nestjs/common';
import { MotivatorsController } from './motivators.controller';
import { MotivatorsService } from './motivators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [MotivatorsController],
  providers: [MotivatorsService],
})
export class MotivatorsModule {}
