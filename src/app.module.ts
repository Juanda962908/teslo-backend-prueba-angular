
import * as process from 'process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SeedModule } from './modules/seed/seed.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { EnvConfiguration } from './commons/config/env.config';
import { ProductsModule } from './modules/products/products.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [EnvConfiguration],
        }),
        MongooseModule.forRoot(process.env.MONGODB),
        ProductsModule,
        SeedModule,
        AuthModule,
        FilesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
