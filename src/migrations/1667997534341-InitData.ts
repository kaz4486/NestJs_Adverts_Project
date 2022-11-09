import { Tag } from '../products/db/tag.entity';

import { faker } from '@faker-js/faker';
import { UserAddress } from '../users/db/addresses.entity';
import { User } from '../users/db/users.entity';
import dataSource from '../data-source';
import { Product } from '../products/db/products.entity';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class $InitData1667997534341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = await this.saveTags();
    this.saveProducts(tags);
    const userAddress = await this.saveUserAddresses();
    await this.saveUsers(userAddress);
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async randomTags(tags: Tag[]): Promise<Tag[]> {
    const opt = Math.floor(Math.random() * tags.length);
    const tagArr: Tag[] = [];

    for (let i = 0; i < opt; i++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!tagArr.includes(tag)) {
        tagArr.push(tag);
      }
    }

    console.log(tagArr);

    return tagArr;
  }

  private async saveProducts(tags: Tag[]): Promise<void> {
    const products: Product[] = [];

    for (let i = 0; i < 101; i++) {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number({ precision: 0.01 }),
        count: faker.datatype.number(100),
        tags: await this.randomTags(tags),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      products.push(product);
    }

    await dataSource.getRepository(Product).save(products);

    console.log('Products saved');
  }

  private async saveUserAddresses(): Promise<UserAddress[]> {
    const userAddress: UserAddress[] = [];

    for (let i = 0; i < 10; i++) {
      const addressToSave = new UserAddress();
      (addressToSave.id = faker.datatype.uuid()),
        (addressToSave.country = faker.address.countryCode()),
        (addressToSave.city = faker.address.city()),
        (addressToSave.street = faker.address.street()),
        (addressToSave.house_number = faker.datatype.number()),
        (addressToSave.flat_number = faker.datatype.number()),
        userAddress.push(
          await dataSource.getRepository(UserAddress).save(addressToSave),
        );
    }

    console.log('User Adresses saved');

    return userAddress;
  }

  private async saveUsers(addresses: UserAddress[]): Promise<void> {
    const users = [];

    for (let i = 0; i < 750; i++) {
      const user = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        date_of_birth: faker.date.past(),
        role: faker.helpers.arrayElement(['ADMIN', 'CUSTOMER', 'SELLER']),
        address: await this.saveUserAddresses(),
      };
      users.push(user);
    }

    await dataSource.getRepository(User).save(users);

    console.log('Users saved');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
