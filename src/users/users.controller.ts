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

  constructor(private userRepository: UsersDataService) {}
  @Get()
  async getAllUsers(): Promise<Array<ExternalUserDto>> {
    return (await this.userRepository.getAllUsers()).map(
      this.mapUserToExternal,
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalUserDto> {
    const user = await this.userRepository.getUserById(_id_);
    console.log(user);
    if (user === undefined || user === null) {
      throw new NotFoundException();
    }
    return this.mapUserToExternal(user);
  }

  @Post()
  async addUser(@Body() _item_: CreateUserDto): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userRepository.addUser(_item_));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _user_: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(_id_, _user_),
    );
  }

  mapUserToExternal(user: User): ExternalUserDto {
    console.log(user);
    return {
      ...user,
      date_of_birth: dateToArray(user.date_of_birth),
    };
  }
}
