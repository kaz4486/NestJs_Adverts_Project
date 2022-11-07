import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-users.dto';
import { User } from './db/users.entity';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/addresses.repository';
import { UserAddress } from './db/addresses.entity';
import { UserValidatorService } from './user-validator.service';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private validateRepository: UserValidatorService,
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

  async addUser(item: CreateUserDto): Promise<User> {
    const checkEmail = this.userRepository.getUserByEmail(item.email);
    if (checkEmail) {
      throw new UserRequireUniqueEmailException();
    }

    const userToSave = new User();
    userToSave.name = item.name;
    userToSave.date_of_birth = item.date_of_birth;
    userToSave.surname = item.surname;
    userToSave.email = item.email;
    userToSave.role = item.role;
    userToSave.address = await this.prepareUserAddressesToSave(item.address);

    const user = this.userRepository.save(userToSave);
    return user;
  }

  deleteUser(id: string): void {
    this.userRepository.delete(id);
  }
  async updateUser(id: string, item: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(id);
    userToUpdate.name = item.name;
    userToUpdate.date_of_birth = item.date_of_birth;
    userToUpdate.surname = item.surname;
    userToUpdate.email = item.email;
    userToUpdate.role = item.role;
    userToUpdate.address = await this.prepareUserAddressesToSave(item.address);

    await this.userAddressRepository.deleteUserAddressesByUserId(id);

    return this.userRepository.save(userToUpdate);

    // const index = this.users.findIndex((i) => i.id === id);
    // this.users[index] = {
    //   ...user,
    //   ...dto,
    //   date_of_birth: arrayToDate(dto.date_of_birth),
    // };
    // return this.users[index];
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    console.log(address);
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

    return addresses;
  }
}
