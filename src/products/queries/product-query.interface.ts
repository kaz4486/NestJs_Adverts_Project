import { TextFilterType } from "../enums/text-filter-type.enums";

export interface ProductsQuery {
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  nameFilterType?: TextFilterType;
  minCount?: number;
  maxCount?: number;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
