/* eslint-disable prettier/prettier */
import { Tags } from '../enums/tags.enums';

export interface UpdateProductDto {
  //?
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}