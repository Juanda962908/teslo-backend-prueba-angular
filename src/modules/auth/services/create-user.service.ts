import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt'

import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from '../dto/create-user.dto';
import { GenerateJwtHelper } from "../helper/generate-jwt.helper";
import { User } from "../../../commons/database/schemas/user.schema";



@Injectable()
export class CreateUserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private tokenHelper: GenerateJwtHelper
    ) {
    }


    public async createUser(createUserBody: CreateUserDto) {
        try {
            const { password, ...userData } = createUserBody
            const newUser = new this.userModel({
                password: bcrypt.hashSync(password, 10),
                ...userData
            })
            await newUser.save()
            delete newUser.password
            const token = this.tokenHelper.getJwtToken({ id: newUser._id.toString() })
            return {
                ...newUser,
                token
            }
        } catch (e) {
            if (e.code === 11000) {
                throw new BadRequestException('El correo ya existe');
            }
            throw new BadRequestException('Error al crear el usuario');
        }
    }
}
