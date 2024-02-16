import { Injectable } from "@nestjs/common";
import { GenerateJwtHelper } from "../helper/generate-jwt.helper";


@Injectable()
export class CheckStatusService {

    constructor(
        private tokenHelper: GenerateJwtHelper
    ) {
    }

    public async checkAuthStatus( user ){
        return {
            ...user,
            token: this.tokenHelper.getJwtToken({ id: user._id.toString() })
        };

    }

}
