/* eslint-disable prettier/prettier */
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsEnum, ValidateNested } from 'class-validator';
import { arrayToDate } from 'src/shared/helpers/date.helper';
import { Roles } from '../../shared/enums/roles.enums';
import { CreateUserAddressDto } from './create-users.dto';

export interface ExternalUserDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    date_of_birth: Array<number>;
    role: Roles;
    address?: Array<ExternalUserAddressDto>;
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
    @Type(() => CreateUserAddressDto)
    address?: Array<CreateUserAddressDto>;
}
}


export interface ExternalUserAddressDto {
    country: string;
    city: string;
    street: string;
    house_number: number;
    flat_number?: number;
  }


