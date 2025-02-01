import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationService } from '../application/application.service';
import { Response } from 'express';
import { ICreateUserDto } from './dtos/dtos';

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

  @Post()
  public async createUser(@Body() req: ICreateUserDto, @Res() res: Response) {
    const response = await this.applicationService.createUser(req);
    return res.status(response.code).json(response);
  }
}
