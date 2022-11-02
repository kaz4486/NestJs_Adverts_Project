/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExternalProductDto } from './dto/external-product.dto';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './interfaces/product.interface';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
  [x: string]: any;
  constructor(private productRepository: ProductsDataService) {}

  @Get()
  getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_),
    );
  }

  @Post()
  addProduct(@Body() _item_: CreateProductDto): ExternalProductDto {
    return this.productRepository.addProduct(_item_);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  updateProduct(
    @Param('id') _id_: string,
    @Body() _product_: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(_id_, _product_),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}