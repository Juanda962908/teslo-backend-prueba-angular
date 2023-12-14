import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../commons/database/schemas";
import { Model } from "mongoose";
import { LoginUserDto } from "../dto/login-user.dto";
import * as bcrypt from 'bcrypt'


@Injectable()
export class LoginUserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
    }


    public async loginUser(loginUserBody: LoginUserDto) {
        try {
            const { password, email } = loginUserBody
            const user = await this.userModel.findOne({ email }).select('email password').lean()
            if(!user){
              return    new UnauthorizedException('Las credenciales no son validas - email')
            }
            if(!bcrypt.compareSync(password,user.password)){
                return  new UnauthorizedException('Credenciales no son validas - password')
            }
            return user
        } catch (e) {

        }
    }

}
