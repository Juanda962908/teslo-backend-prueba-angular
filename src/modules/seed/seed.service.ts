import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initialDataProducts } from '../../commons/database/initial-data/products/initial-products';
import { ConfigService } from '@nestjs/config';
import { Product, User } from "../../commons/database/schemas";
import { initialUsers } from "../../commons/database/initial-data/users/initial-users";


@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService,
    ) {
    }


    async create() {
        if (this.configService.get('environment') === 'production') {
            return false;
        }
        try {
            await this.productModel.deleteMany();
            await this.userModel.deleteMany()
            await this.productModel.insertMany(
                initialDataProducts.products,
            );
            await this.userModel.insertMany(initialUsers.users)

            return true

        } catch (e) {
            throw e;
        }
    }
}
