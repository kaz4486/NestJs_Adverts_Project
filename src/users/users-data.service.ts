import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './db/users.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { arrayToDate } from 'src/shared/helpers/date.helper';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserById(id: string): User {
    const user = this.users.find((i) => i.id === id);
    return user;
  }

  getUserByEmail(email: string): User {
    return this.users.find((i) => i.email === email);
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
    this.users[index] = {
      ...user,
      ...dto,
      date_of_birth: arrayToDate(dto.date_of_birth),
    };
    return this.users[index];
  }
}
