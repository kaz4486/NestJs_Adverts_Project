import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders.data-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './db/orders.repository';
import { OrderedProductRepository } from './db/ordered-products.repository';
import { ProductRepository } from 'src/products/db/products.repository';
import { UserRepository } from 'src/users/db/users.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersDataService,
    OrderRepository,
    ProductRepository,
    UserRepository,
    OrderedProductRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderedProductRepository,
      ProductRepository,
      UserRepository,
    ]),
  ],
})
export class OrdersModule {}
