import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../commons/database/schemas/product.schema';
import { Model } from 'mongoose';
import { initialDataProducts } from '../../commons/database/initial-data/products/initial-products';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private readonly configService: ConfigService,
  ) {}
  async create() {
    if (this.configService.get('environment') === 'production') {
      return false;
    }
    try {
      await this.productModel.deleteMany();
      const productSeed = await this.productModel.insertMany(
        initialDataProducts.products,
      );
      return productSeed;
    } catch (e) {
      throw e;
    }
  }
}
