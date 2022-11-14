import { Product } from 'src/products/db/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity({
  name: 'ordered-products',
})
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({
    default: 1,
  })
  count: number;
}
