import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../commons/database/schemas/user.schema";
import { LoginUserService } from "./services/login-user.service";

@Module({
  imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [AuthController],
  providers: [CreateUserService,LoginUserService],
})
export class AuthModule {}
