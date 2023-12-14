import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginUserService } from "./services/login-user.service";


@Controller('auth')
export class AuthController {
  constructor(
      private readonly createUserService: CreateUserService,
      private readonly loginUserService: LoginUserService

  ) {}

  @Post('register')
 private _createUsr(@Body() createAuthDto: CreateUserDto) {
    return this.createUserService.createUser(createAuthDto);
  }


  @Post('login')
  private _loginUser(@Body() loginUserDto: LoginUserDto ){

    return this.loginUserService.loginUser(loginUserDto)
  }

}
