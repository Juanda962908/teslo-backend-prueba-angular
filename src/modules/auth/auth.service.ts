import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../commons/database/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthService {


  constructor(
      @InjectModel(User.name) private userModel: Model<User>
  ) {
  }


public async  create(createAuthDto: CreateUserAuthDto) {
    try {

        const newUser = new this.userModel(createAuthDto)
        const savedUser = await newUser.save()
        return savedUser

    }catch (e) {
        console.log(e)
        if(e.code === 11000){
            throw new BadRequestException('El correo ya existe');
        }
        throw new BadRequestException('Error al crear el usuario');
    }
  }
}
