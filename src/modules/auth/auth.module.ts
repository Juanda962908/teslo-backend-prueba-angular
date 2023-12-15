import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../commons/database/schemas/user.schema";
import { LoginUserService } from "./services/login-user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GenerateJwtHelper } from "./helper/generate-jwt.helper";
import { CheckStatusService } from "./services/check-status.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: '2h'
                    }
                }
            }
        }),
        ConfigModule
    ],
    exports: [JwtStrategy, PassportModule, MongooseModule, JwtModule],
    controllers: [AuthController],
    providers: [CreateUserService, LoginUserService, CheckStatusService, JwtStrategy, GenerateJwtHelper],
})
export class AuthModule {
}
