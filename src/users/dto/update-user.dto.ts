/* eslint-disable prettier/prettier */
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { arrayToDate } from 'src/shared/helpers/date.helper';
import { Roles } from '../../shared/enums/roles.enums';

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    surname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform((d) => arrayToDate(d))
    date_of_birth: Date;
    // date_of_birth: Array<number>

    @IsEnum(Roles)
    role: Roles;

    @ValidateNested({each: true})
    @Type(() => UpdateUserAddressDto)
    address: Array<UpdateUserAddressDto>;
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

    @IsNumber()
    @IsOptional()
    flat_number?: number;
  }