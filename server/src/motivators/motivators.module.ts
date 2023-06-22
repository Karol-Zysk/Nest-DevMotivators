import { Module, forwardRef } from '@nestjs/common';
import { MotivatorsController } from './motivators.controller';
import { MotivatorsService } from './motivators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Motivator, MotivatorSchema } from 'src/entities';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Motivator.name,
        schema: MotivatorSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [MotivatorsController],
  providers: [MotivatorsService],
  exports: [MongooseModule],
})
export class MotivatorsModule {}
