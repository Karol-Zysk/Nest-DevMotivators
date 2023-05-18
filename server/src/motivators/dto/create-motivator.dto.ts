import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMotivatorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(1000)
  subTitle: string;

  @IsNotEmpty()
  keyWords: string[];

  @IsString()
  @IsNotEmpty()
  image: string;
}
