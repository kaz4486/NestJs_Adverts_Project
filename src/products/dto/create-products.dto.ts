/* eslint-disable prettier/prettier */
import { Tags } from '../enums/tags.enums';

export interface CreateProductDto {
  //?
  // updatedAt: Date;
  // createdAt: Date;
  // id: any;
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}
