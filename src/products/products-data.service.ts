import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import shortid from 'shortid';
import { CreateProductDto } from './dto/create-products.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  getAllProducts(): Array<Product> {
    return this.products;
  }
  getProductById(id: string): Product {
    return this.products.find((i) => (i.id = id));
  }
  addProduct(_item_: CreateProductDto): ExternalProductDto {
    const product: Product = {
      ..._item_,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(product);
    // return newProduct;
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
  deleteProduct(id: string): void {
    this.products = this.products.filter((i) => i.id !== id);
  }
  updateProduct(id: string, dto: UpdateProductDto): Product {
    this.products = this.products.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }

      return i;
    });

    return this.getProductById(id);
  }
}
