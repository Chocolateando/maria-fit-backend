import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationService } from '../application/application.service';
import { Response } from 'express';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  public async getUsers(@Res() res: Response) {
    const response = await this.applicationService.getUsers();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.applicationService.getUserById(id);
    return res.status(response.code).json(response);
  }
}
