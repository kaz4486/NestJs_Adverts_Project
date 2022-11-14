import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { dataSourceOptions } from './data-source';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    OrdersModule,
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
