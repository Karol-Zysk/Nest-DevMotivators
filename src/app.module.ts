import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MotivatorsModule } from './motivators/motivators.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(''), UsersModule, MotivatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
