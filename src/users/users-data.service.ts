import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { arrayToDate } from 'src/shared/helpers/date.helper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((i) => i.id === id);
  }
  addUser(_item_: CreateUserDto): User {
    const user: User = {
      ..._item_,
      id: uuidv4(),
      date_of_birth: arrayToDate(_item_.date_of_birth),
    };
    this.users.push(user);
    return user;
  }
  deleteUser(id: string): void {
    this.users = this.users.filter((i) => i.id !== id);
  }
  updateUser(id: string, dto: UpdateUserDto): User {
    const user = this.getUserById(id);
    const index = this.users.findIndex((i) => i.id === id);
    this.users[index] = { ...user, ...dto };
    return this.users[index];
  }
}
