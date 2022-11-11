import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from '../../shared/enums/roles.enums';

import { UserAddress } from './addresses.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  date_of_birth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];
  orders: any;
}
