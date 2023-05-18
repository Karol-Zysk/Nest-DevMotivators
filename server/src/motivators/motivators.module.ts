import { Module } from '@nestjs/common';
import { MotivatorsController } from './motivators.controller';
import { MotivatorsService } from './motivators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Motivator, MotivatorSchema } from 'src/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Motivator.name,
        schema: MotivatorSchema,
      },
    ]),
  ],
  controllers: [MotivatorsController],
  providers: [MotivatorsService],
  exports: [MongooseModule],
})
export class MotivatorsModule {}
