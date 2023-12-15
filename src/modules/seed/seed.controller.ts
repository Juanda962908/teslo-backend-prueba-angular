import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SeedService } from './seed.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { ValidRolesEnums } from "../auth/entities/valid-roles.entities";

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRolesEnums.admin)
  private async _create(@Res() res: Response) {
    const seedProduct = await this.seedService.create();
    if (!seedProduct)
      return res
        .status(400)
        .json({ message: 'No puedes ejecutar este servicio en prod' });

    return res.status(200).json({ seedProduct });
  }
}
