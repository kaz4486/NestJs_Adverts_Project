/* eslint-disable prettier/prettier */
import { Roles } from '../../shared/enums/roles.enums';

export interface ExternalUserDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    date_of_birth: Array<number>;
    role: Roles;
    adress?: Array<ExternalUserAddressDto>;
}


export interface ExternalUserAddressDto {
    country: string;
    city: string;
    street: string;
    house_number: number;
    flat_number?: number;
  }


