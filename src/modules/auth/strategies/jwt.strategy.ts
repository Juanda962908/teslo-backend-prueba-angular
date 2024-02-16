import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { InjectModel } from "@nestjs/mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../../commons/database/schemas";
import { IJwtPayload } from "../entities/jwt-payload.entities";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }


    async validate(payload: IJwtPayload): Promise<User> {
        const { id } = payload
        const user = await this.userModel.findById({ _id: id })
        if (!user) {
            throw new UnauthorizedException('Token no valido')
        }
        if (!user.isActive) {
            throw new UnauthorizedException('User no activo')
        }
        return user
    }
}
