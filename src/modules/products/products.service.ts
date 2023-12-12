import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../commons/database/dto/create-product.dto';
import { UpdateProductDto } from '../../commons/database/dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../commons/database/schemas/product.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GENDERS } from '../../commons/constants/genders';


@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
        private readonly configService: ConfigService,
    ) {
    }

    public findAll() {
        try {
            return this.productModel.find().exec();
        } catch (e) {
            throw e;
        }
    }

    public findOneBySlug(slug: string) {
        try {
            return this.productModel.findOne({ slug }).lean();
        } catch (e) {
            throw e;
        }
    }

    public async findAllProductsByGender(gender: string = 'all') {
        let condition = {};
        if (gender !== 'all' && GENDERS.validGenders.includes(`${gender}`)) {
            condition = { gender };
        }
        try {
            const products = this.productModel
                .find(condition)
                .select('title images price inStock slug -_id') // son los campos que solo quiero enviar
                .lean();
            return products;
        } catch (e) {
            throw e;
        }
        return;
    }

    public create(createProductDto: CreateProductDto) {
        return 'This action adds a new product';
    }

    public update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    public remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
