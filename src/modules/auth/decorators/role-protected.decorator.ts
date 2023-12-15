import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from "../constants/meta-roles.constants";
import { ValidRolesEnums } from "../entities/valid-roles.entities";


export const RoleProtected = (...args: ValidRolesEnums[]) => SetMetadata(META_ROLES, args);
