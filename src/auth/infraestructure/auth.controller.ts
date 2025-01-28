import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';
import { ICredentials } from './dtos/auth';
import { Response } from 'express';
import { ApplicationServices } from '../application/application.services';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly _applicationService: ApplicationServices) {}

  @Public()
  @Post('login')
  async login(@Body() dto: ICredentials, @Res() res: Response) {
    const response = await this._applicationService.login(dto);
    if (response.error) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    return res.status(HttpStatus.OK).json(response);
  }
}
