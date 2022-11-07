/* eslint-disable prettier/prettier */
import { Tags } from '../enums/tags.enums';

export interface ExternalProductDto {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: string[];
  createdAt: Array<number>;
  updatedAt: Array<number>;
}
