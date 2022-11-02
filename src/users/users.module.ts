import { Module } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersDataService],
})
export class UsersModule {}
