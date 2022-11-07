import { Module } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UsersController } from './users.controller';
import { UserValidatorService } from './user-validator.service';
import { User } from './db/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/addresses.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersDataService,
    UserValidatorService,
    UserRepository,
    UserAddressRepository,
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
