import { Injectable } from "@nestjs/common";
import { IJwtPayload } from "../entities/jwt-payload.entities";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class GenerateJwtHelper {

    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    public getJwtToken( payload:IJwtPayload){
        const token = this.jwtService.sign(payload)
        return token
    }

}
