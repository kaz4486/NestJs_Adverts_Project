import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-users.dto';
import { User } from './db/users.entity';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/addresses.repository';
import { UserAddress } from './db/addresses.entity';
import { UserValidatorService } from './user-validator.service';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private validateRepository: UserValidatorService,
    private dataSource: DataSource,
  ) {}
  private users: Array<User> = [];

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async addUser(user: CreateUserDto): Promise<User> {
    return this.dataSource.transaction(async () => {
      const checkEmail = await this.getUserByEmail(user.email);
      if (checkEmail) {
        throw new UserRequireUniqueEmailException();
      }
      const userToSave = new User();

      userToSave.name = user.name;
      userToSave.surname = user.surname;
      userToSave.email = user.email;
      userToSave.role = user.role;
      userToSave.date_of_birth = user.date_of_birth;

      userToSave.address = await this.prepareUserAddressesToSave(
        user.address,
        this.userAddressRepository,
      );

      return await this.userRepository.save(userToSave);
    });
  }

  deleteUser(id: string): void {
    this.userRepository.delete(id);
  }
  async updateUser(id: string, item: UpdateUserDto): Promise<User> {
    return this.dataSource.transaction(async () => {
      const userToUpdate = await this.getUserById(id);

      userToUpdate.name = item.name;
      userToUpdate.date_of_birth = item.date_of_birth;
      userToUpdate.surname = item.surname;
      userToUpdate.email = item.email;
      userToUpdate.role = item.role;
      userToUpdate.address = await this.prepareUserAddressesToSave(
        item.address,
        this.userAddressRepository,
      );

      await this.userAddressRepository.deleteUserAddressesByUserId(id);

      return await this.userRepository.save(userToUpdate);
    });
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
    userAddressRepository: UserAddressRepository,
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.house_number = add.house_number;
      addressToSave.flat_number = add.flat_number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return userAddressRepository.save(addresses);
  }
}
