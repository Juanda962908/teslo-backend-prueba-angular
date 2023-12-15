import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRolesEnums } from "../entities/valid-roles.entities";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";


export function Auth(...roles:ValidRolesEnums []) {
    return applyDecorators(
        RoleProtected(...roles),// la primera protección es que debe ser un rol de admin
        UseGuards(AuthGuard(), UserRoleGuard), // la segunda protección es que debe estar autenticado y se vuelve a  validar el rol
    );
}
