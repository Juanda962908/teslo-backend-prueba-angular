import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginUserService } from "./services/login-user.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../../commons/database/schemas";
import { ValidRolesEnums } from "./entities/valid-roles.entities";
import { Auth } from "./decorators/auth.decorator";
import { GetUser } from "./decorators/get-user.decorator";
import { RoleProtected } from "./decorators/role-protected.decorator";
import { UserRoleGuard } from "./guards/user-role.guard";
import { RawHeaders } from "./decorators/raw-headers.decorator";
import { CheckStatusService } from "./services/check-status.service";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly loginUserService: LoginUserService,
        private readonly checkAuthService: CheckStatusService
) {
    }

    @Post('register')
    private _createUsr(@Body() createAuthDto: CreateUserDto) {
        return this.createUserService.createUser(createAuthDto);
    }

    @Get('check-status')
    @Auth(ValidRolesEnums.admin,ValidRolesEnums.admin,ValidRolesEnums.superUser)
    checkAuthStatus(
        @GetUser() user: User
    ) {
        return this.checkAuthService.checkAuthStatus( user );
    }

    @Post('login')
    private _loginUser(@Body() loginUserDto: LoginUserDto) {

        return this.loginUserService.loginUser(loginUserDto)
    }


    @Get('private')
    @UseGuards(AuthGuard())
    private _testingPrivateRoute(@GetUser('email') user: User, @RawHeaders() rawHeaders: string[]) {
        return {
            ok: true,
            message: 'Hola mundo private',
            user,
            rawHeaders
        }
    }


    @Get('private2')
    @RoleProtected(ValidRolesEnums.admin) // la primera protección es que debe ser un rol de admin
    @UseGuards(AuthGuard(), UserRoleGuard) // la segunda protección es que debe estar autenticado y se valida el rol
    private _testingPrivateRoute2(@GetUser('email') user: User, @RawHeaders() rawHeaders: string[]) {
        return {
            ok: true,
            message: 'Hola mundo private',
            user,
            rawHeaders
        }
    }
    @Get('private3')
    @Auth(ValidRolesEnums.admin)
    private _testingPrivateRoute3(@GetUser('email') user: User) {
        return {
            ok: true,
            message: 'Hola mundo private',
            user,
        }
    }
}
