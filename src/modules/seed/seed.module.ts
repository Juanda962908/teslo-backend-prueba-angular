import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from '../../commons/database/entities/product.entity';
import { ProductSchema } from '../../commons/database/schemas/product.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [SeedController],
  providers: [SeedService, ConfigService],
})
export class SeedModule {}
