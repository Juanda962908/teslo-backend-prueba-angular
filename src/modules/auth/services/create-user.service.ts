import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../commons/database/schemas/user.schema";
import { Model } from "mongoose";

import * as bcrypt from 'bcrypt'


@Injectable()
export class CreateUserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
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
            return newUser
        } catch (e) {
            if (e.code === 11000) {
                throw new BadRequestException('El correo ya existe');
            }
            throw new BadRequestException('Error al crear el usuario');
        }
    }
}
