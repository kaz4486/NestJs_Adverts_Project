/* eslint-disable prettier/prettier */
import { Roles } from '../enums/roles.enums';

export interface UpdateUserDto {
    name: string;
    surname: string;
    email: string;
    date_of_birth: Date;
    role: Roles;
    adress: UserAddressDto;
}

export interface UserAddressDto {
    country: string;
    city: string;
    street: string;
    house_number: number;
    flat_number?: number;
  }