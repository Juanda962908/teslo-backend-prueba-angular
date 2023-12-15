import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {
  Product,
  ProductSchema,
} from '../../commons/database/schemas/product.schema';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      AuthModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ConfigService],
})
export class ProductsModule {}
