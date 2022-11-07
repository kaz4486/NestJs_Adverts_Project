import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_addresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  street: string;

  @Column({
    type: 'int',
  })
  house_number: number;

  @Column({
    type: 'int',
  })
  flat_number?: number;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
