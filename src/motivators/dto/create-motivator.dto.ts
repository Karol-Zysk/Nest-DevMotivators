import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMotivatorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(1000)
  subTitle: string;

  @IsArray()
  @IsNotEmpty()
  keyWords: string[];

  @IsString()
  @IsNotEmpty()
  photo: string;
}
