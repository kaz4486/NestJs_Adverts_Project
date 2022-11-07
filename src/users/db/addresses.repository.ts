import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserAddress } from './addresses.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }

  async deleteUserAddressesByUserId(id: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id,
      },
    });

    this.remove(usersAddresses);
  }
}
