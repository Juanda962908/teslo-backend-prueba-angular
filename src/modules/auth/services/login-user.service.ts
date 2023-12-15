import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../commons/database/schemas";
import { Model } from "mongoose";
import { LoginUserDto } from "../dto/login-user.dto";
import * as bcrypt from 'bcrypt'
import { GenerateJwtHelper } from "../helper/generate-jwt.helper";


@Injectable()
export class LoginUserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private tokenHelper: GenerateJwtHelper
    ) {
    }


    public async loginUser(loginUserBody: LoginUserDto) {
        try {
            const { password, email } = loginUserBody
            const user = await this.userModel.findOne({ email }).select('email name password role isActive _id').lean()
            if (!user) {
                return new UnauthorizedException('Las credenciales no son validas - email')
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return new UnauthorizedException('Credenciales no son validas - password')
            }
            delete user.password
            delete user.isActive
            const token = this.tokenHelper.getJwtToken({ id: user._id.toString()})
            console.log("******************",user)
            return {
                ...user,
                token
            }
        } catch (e) {
        }
    }
}
