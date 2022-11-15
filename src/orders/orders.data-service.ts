import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/db/products.entity';
import { ProductRepository } from 'src/products/db/products.repository';
import { UserAddress } from 'src/users/db/addresses.entity';
import { User } from 'src/users/db/users.entity';
import { DataSource, getCustomRepository, In } from 'typeorm';
import { OrderedProduct } from './db/ordered-products.entity';
import { OrderedProductRepository } from './db/ordered-products.repository';
import { Order } from './db/orders.entity';
import { OrderRepository } from './db/orders.repository';
import {
  CreateOrderDto,
  CreateOrderedProductDto,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Statuses } from './enums/statuses.enums';

@Injectable()
export class OrdersDataService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private orderedProductsRepository: OrderedProductRepository,
    private dataSource: DataSource,
  ) {}

  async saveOrderedProducts(
    productsToSave: CreateOrderedProductDto[],
  ): Promise<OrderedProduct[]> {
    const orderedProducts: OrderedProduct[] = [];

    // const orderedProductsIds: Array<string> = [];

    // productsToSave.map((i) => {
    //   orderedProductsIds.push(i.productId);
    // });

    for (let i = 0; i < productsToSave.length; i++) {
      const orderedProduct = new OrderedProduct();
      const productFromDB = await this.productRepository.findOneBy({
        id: productsToSave[i].productId,
      });

      orderedProduct.product = new Product();
      orderedProduct.product.id = productFromDB.id;
      orderedProduct.product.name = productFromDB.name;
      orderedProduct.count = productFromDB.count;
      orderedProduct.price = productFromDB.price;

      await this.orderedProductsRepository.save(orderedProduct);
      orderedProducts.push(orderedProduct);

      // orderedProduct.product = orderedProducts[i]
    }
    return orderedProducts;
    // return await this.productRepository.findBy({
    //   id: In(ids),
    // });
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  getOrderById(id: string): Promise<Order> {
    const order = this.orderRepository.findOneBy({ id });
    return order;
  }

  async addOrder(order: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async () => {
      const orderToSave = new Order();

      orderToSave.orderedProducts = await this.saveOrderedProducts(
        order.products,
      );
      orderToSave.status = Statuses.NEW;
      orderToSave.user = new User();
      orderToSave.user.id = order.userId;
      orderToSave.userAddress = new UserAddress();
      orderToSave.userAddress.id = order.userAddressesId;
      orderToSave.additionalInformations = order.additionalInformations;
      orderToSave.price = 0;

      let productPrice = 0;
      orderToSave.orderedProducts.forEach((product) => {
        productPrice += product.price * product.count;
        return orderToSave.price;
      });

      order.products.forEach((product) => {
        const productAmount = product.count;
        orderToSave.price += productPrice * productAmount;
      });
      return await this.orderRepository.save(orderToSave);
    });
  }

  async updateOrder(id: string, order: UpdateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async () => {
      const orderToUpdate = await this.getOrderById(id);

      if (orderToUpdate === undefined || orderToUpdate === null) {
        throw new NotFoundException();
      }

      this.orderedProductsRepository.deleteProductOrderByOrderId(id);
      orderToUpdate.orderedProducts = await this.saveOrderedProducts(
        order.products,
      );

      orderToUpdate.status = order.status;
      orderToUpdate.user = new User();
      orderToUpdate.user.id = order.userId;
      orderToUpdate.userAddress = new UserAddress();
      orderToUpdate.userAddress.id = order.userAddressesId;
      orderToUpdate.additionalInformations = order.additionalInformations;
      orderToUpdate.price = 0;

      let productPrice = 0;
      orderToUpdate.orderedProducts.forEach((product) => {
        productPrice += product.price * product.count;
        return orderToUpdate.price;
      });

      order.products.forEach((product) => {
        const productAmount = product.count;
        orderToUpdate.price += productPrice * productAmount;
      });

      await this.orderRepository.save(orderToUpdate);

      return this.getOrderById(id);
    });
  }

  deleteOrder(id: string): void {
    this.orderRepository.delete(id);
  }

  async addProductToOrder(
    orderId: string,
    productToOrder: CreateOrderedProductDto,
  ): Promise<OrderedProduct> {
    return await this.dataSource.transaction(async () => {
      const product = await this.productRepository.findOneBy({
        id: productToOrder.productId,
      });
      return await this.orderedProductsRepository.saveNewProduct(
        product,
        orderId,
        productToOrder,
      );
    });
  }

  async deleteProductsFromOrder(
    idOrderProduct: string,
    orderId: string,
  ): Promise<Order> {
    await this.orderedProductsRepository.delete({ id: idOrderProduct });
    const order = await this.orderRepository.findOneBy({
      id: orderId,
    });
    console.log(order);
    return order;
  }

  async updateUserAddress(
    orderId: string,
    userAddressId: string,
  ): Promise<Order> {
    await this.orderRepository.update(
      {
        id: orderId,
      },
      {
        userAddress: {
          id: userAddressId,
        },
      },
    );

    return this.orderRepository.findOneBy({ id: orderId });
  }
}
