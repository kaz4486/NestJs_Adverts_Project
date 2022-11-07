import { Injectable } from '@nestjs/common';
import { Product } from './db/products.entity';
import { CreateProductDto } from './dto/create-products.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { TagRepository } from './db/tags.repository';
import { ProductRepository } from './db/products.repository';
import { Tag } from './db/tag.entity';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
  ) {}
  private products: Array<Product> = [];

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async addProduct(item: CreateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();
    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;
    return this.productRepository.save(productToSave);
  }
  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(id);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return this.getProductById(id);
  }
}
