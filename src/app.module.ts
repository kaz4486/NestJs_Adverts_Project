import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forRoot(config as ConnectionOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
