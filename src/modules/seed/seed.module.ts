import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../commons/database/schemas/product.schema';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from "../../commons/database/schemas";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },
            { name: User.name, schema: UserSchema }]),
    ],
    controllers: [SeedController],
    providers: [SeedService, ConfigService],
})
export class SeedModule {
}
