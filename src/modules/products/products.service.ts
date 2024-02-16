import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../commons/database/schemas/product.schema';
import { Model } from 'mongoose';
import { GENDERS } from '../../commons/constants/genders';
import { PaginationDto } from "../../commons/dtos/pagination.dto";


@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
    ) {
    }


    public findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto
        try {
            return this.productModel.find().sort(
                {
                    no: 1
                }
            ).exec();
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
}
