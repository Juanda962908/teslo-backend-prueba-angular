import mongoose from 'mongoose';
import { Response } from 'express';
import { Controller, Get, Param, Query, Res, } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { PaginationDto } from "../../commons/dtos/pagination.dto";


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }


    /// con @query traigo todos los queryparams, paginationDto es el nombre de la variable que tiene los query param
    @Get()
    private findAll(@Query() paginationDto: PaginationDto) {
        return this.productsService.findAll(paginationDto);
    }


    @Get('gender/:id') // ex: gender/men
    private async _findAllByGender(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const products = await this.productsService.findAllProductsByGender(id);
        console.log('""', mongoose.connections.length);
        if (!products)
            return res.status(400).json({ message: 'No se encontraron productos' });
        return res.status(200).json({ products });
    }


    @Get('slug/:id') // ex: slug/mens_chill_crew_neck_sweatshirt
    private async _findOneBySlug(@Param('id') id: string, @Res() res: Response) {
        const product = await this.productsService.findOneBySlug(id);
        if (!product)
            return res.status(400).json({
                message: 'No se pudo encontrar producto revisa petición y servicio',
            });
        return res.status(200).json({ product });
    }

}
