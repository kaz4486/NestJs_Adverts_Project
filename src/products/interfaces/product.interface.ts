/* eslint-disable prettier/prettier */
import { Tags } from '../enums/tags.enums';

/* eslint-disable prettier/prettier */
export interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
  createdAt: Date;
  updatedAt: Date;
}
