import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './db/products.entity';
import { TagRepository } from './db/tags.repository';
import { ProductRepository } from './db/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsDataService, TagRepository, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
