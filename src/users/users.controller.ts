import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateUserDto } from './dto/create-users.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
@Controller('users')
export class UsersController {
  [x: string]: any; //????

  constructor(private userRepository: UsersDataService) {}
  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Post()
  addUser(@Body() _item_: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addUser(_item_));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id') _id_: string,
    @Body() _user_: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.updateUser(_id_, _user_));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      date_of_birth: dateToArray(user.date_of_birth),
    };
  }
}
