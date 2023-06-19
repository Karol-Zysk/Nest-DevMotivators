import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  userPhoto: string;

  @IsString()
  aboutMe: string;
}
