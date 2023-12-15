import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { User } from "../../../commons/database/schemas";
import { META_ROLES } from "../constants/meta-roles.constants";


@Injectable()
export class UserRoleGuard implements CanActivate {


    constructor(
        private readonly reflector: Reflector // me ayuda a ver la data de los decoradores.
    ) {

    }


    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler()) // traigo el decorador de roles que está en el método del controler
        if(!validRoles) return true // si no existe valid roles es porque no tengo un decorador validador de roles antes que el decorador de esta guarda
        const req = context.switchToHttp().getRequest()
        const user = req.user as User

        if (!user) {
            throw new BadRequestException('User not found')
        }
            if (validRoles.includes(user.role)) {
                return true
            }
        throw  new ForbiddenException('El usuario necesita un rol valido para consumir esta api')
    }
}
