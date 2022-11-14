import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  Min,
  IsNumber,
  IsEnum,
  MaxLength,
  MinLength,
  IsEmail,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { User } from 'src/users/db/users.entity';
import { CreateUserAddressDto } from 'src/users/dto/create-users.dto';
import { CreateDateColumn } from 'typeorm';
import { Statuses } from '../enums/statuses.enums';

export class ExternalOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderedUserDto)
  user: ExternalOrderedUserDto;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderedProductDto)
  orderedProducts: Array<ExternalOrderedProductDto>;

  @IsEnum(Statuses)
  status: Statuses;

  @Min(0)
  @IsNumber()
  price: number;

  @IsDate()
  createdAt: Array<number>;
}

export class ExternalOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  orderedProductId: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @MinLength(0)
  @MaxLength(25)
  productName: string;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  count: number;
}

export class ExternalOrderedUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address: Array<CreateUserAddressDto>;
}
