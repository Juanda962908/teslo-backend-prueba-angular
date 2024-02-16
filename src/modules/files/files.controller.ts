import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';

import { FilesService } from './files.service';
@Controller('files')
export class FilesController {
  constructor(
      private readonly filesService: FilesService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
      @Res() res: Response,
      @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage( imageName );
    res.sendFile( path );
  }
}
