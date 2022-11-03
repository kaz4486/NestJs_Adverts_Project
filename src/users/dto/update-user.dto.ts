/* eslint-disable prettier/prettier */
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { arrayToDate } from 'src/shared/helpers/date.helper';
import { Roles } from '../enums/roles.enums';

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    surname: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    // // @Transform((d) => arrayToDate(d))
    // date_of_birth: Date;
    date_of_birth: Array<number>

    @IsEnum(Roles)
    role: Roles;

    @ValidateNested({each: true})
    @Type(() => UpdateUserAddressDto)
    adress: Array<UpdateUserAddressDto>;
}

export class UpdateUserAddressDto {
    @IsNotEmpty()
    country: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    street: string;
    @IsNotEmpty()
    @IsNumber()
    house_number: number;
    @IsNotEmpty()
    @IsNumber()
    flat_number?: number;
  }