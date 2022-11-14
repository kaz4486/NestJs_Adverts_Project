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
import { User } from 'src/users/db/users.entity';
import { UserRepository } from 'src/users/db/users.repository';
import { OrderedProduct } from './db/ordered-products.entity';
import { Order } from './db/orders.entity';
import { OrderRepository } from './db/orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersDataService } from './orders.data-service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderRepository: OrdersDataService,
    private userRepository: UserRepository,
  ) {}

  @Get()
  async getAllProducts(): Promise<ExternalOrderDto[]> {
    const orders = await this.orderRepository.getAllOrders();
    return orders.map((i) => this.mapOrderToExternal(i));
  }

  @Get(':id')
  async geOrdersById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDto> {
    const order = await this.orderRepository.getOrderById(id);
    if (order === undefined || order === null) {
      throw new NotFoundException();
    }
    return this.mapOrderToExternal(order);
  }

  @Post()
  async addOrder(@Body() order: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderRepository.addOrder(order));
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return this.orderRepository.deleteOrder(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.updateOrder(id, order),
    );
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    const user = {
      name: order.user.name,
      surname: order.user.surname,
      email: order.user.email,
      address: order.user.address,
    };

    return {
      ...order,
      user: user,
      orderedProducts: order.orderedProducts.map((i) => {
        const orderedProduct = {
          orderedProductId: i.id,
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          count: i.product.count,
        };
        return orderedProduct;
      }),
      createdAt: dateToArray(order.createdAt),
    };
  }
}
