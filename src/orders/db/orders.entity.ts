import { UserAddress } from 'src/users/db/addresses.entity';
import { User } from 'src/users/db/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Statuses } from '../enums/statuses.enums';
import { OrderedProduct } from './ordered-products.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order, {
    eager: true,
    onDelete: 'CASCADE',
  })
  orderedProducts: Array<OrderedProduct>;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.id, {
    eager: true,
  })
  userAddress: UserAddress;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  additionalInformations: string;
}
