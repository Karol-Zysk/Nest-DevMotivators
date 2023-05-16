import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMotivatorDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  subTitle: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  keyWords: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  photo: string;
}
