import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateUserDto } from './dto/create-users.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './db/users.entity';
import { UserValidatorService } from './user-validator.service';
import { UsersDataService } from './users-data.service';
@Controller('users')
export class UsersController {
  [x: string]: any; //????

  constructor(
    private userRepository: UsersDataService,
    private validateRepository: UserValidatorService,
  ) {}
  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): ExternalUserDto {
    const user = this.userRepository.getUserById(_id_);

    if (user === undefined) {
      throw new NotFoundException();
    }
    return this.mapUserToExternal(user);
  }

  @Post()
  addUser(@Body() _item_: CreateUserDto): ExternalUserDto {
    this.validateRepository.validateUniqueEmail(_item_.email);
    return this.mapUserToExternal(this.userRepository.addUser(_item_));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
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
