/* eslint-disable @typescript-eslint/no-unused-vars */

import { ExternalProductDto } from './dto/external-product.dto';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './db/products.entity';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDto } from './dto/update-products.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Post,
  UseGuards,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { Query } from 'typeorm/driver/Query';
import { ProductsQuery } from './queries/product-query.interface';
import { QueryBuilder } from 'typeorm';

@Controller('products')
export class ProductsController {
  [x: string]: any;
  constructor(private productService: ProductsDataService) {}

  @Get()
  async getAllProducts(): Promise<ExternalProductDto[]> {
    return (await this.productService.getAllProducts()).map((i) =>
      this.mapProductToExternal(i),
    );
    // return products.map((i) => this.mapProductToExternal(i));
  }

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    const product = await this.productService.getProductById(id);
    if (product === undefined || product === null) {
      throw new NotFoundException();
    }
    return this.mapProductToExternal(product);
  }

  @Post()
  @UseGuards(RoleGuard)
  async addProduct(
    @Body() _item_: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.addProduct(_item_),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') _id_: string): Promise<void> {
    return await this.productService.deleteProduct(_id_);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.updateProduct(id, product),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
