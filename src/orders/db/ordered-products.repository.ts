import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/db/products.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderedProductDto } from '../dto/create-order.dto';
import { OrderedProduct } from './ordered-products.entity';
import { Order } from './orders.entity';

@Injectable()
export class OrderedProductRepository extends Repository<OrderedProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderedProduct, dataSource.createEntityManager());
  }

  public async deleteProductOrderByOrderId(orderId: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        id: orderId,
      },
    });

    await this.remove(orderProducts);
  }

  public async saveNewProduct(
    product: Product,
    orderId: string,
    item: CreateOrderedProductDto,
  ): Promise<OrderedProduct> {
    const orderedProduct = new OrderedProduct();

    orderedProduct.product = new Product();
    orderedProduct.count = item.count;
    orderedProduct.price = product.price * item.count;
    orderedProduct.product.id = product.id;
    orderedProduct.product.name = product.name;
    orderedProduct.order = new Order();
    orderedProduct.order.id = orderId;

    return await this.save(orderedProduct);
  }
}
