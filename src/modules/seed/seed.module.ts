import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../commons/database/schemas/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from "../../commons/database/schemas";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },
            { name: User.name, schema: UserSchema }]),
        ConfigModule,
        AuthModule
    ],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {
}
