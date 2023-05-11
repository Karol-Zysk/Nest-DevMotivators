import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(16)
  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class SignUpDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(16)
  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
