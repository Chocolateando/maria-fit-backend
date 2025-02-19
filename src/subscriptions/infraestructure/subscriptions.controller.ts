import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsApplication } from '../application/subscriptions.application';
import { Response } from 'express';
import { ICreateSubscription } from './dtos/dtos';
import { PermissionGuard } from '../../shared/infraestructure/guards/permission.guard';

@ApiBearerAuth()
@ApiTags('subscriptions')
@Controller('api/v1/subscriptions')
export class SubscriptionsController {
  constructor(private readonly _subsApplication: SubscriptionsApplication) {}

  @Get()
  @UseGuards(PermissionGuard)
  public async getSubscriptions(@Res() res: Response) {
    const response = await this._subsApplication.getSubscriptions();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @UseGuards(PermissionGuard)
  public async getSubscriptionById(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const response = await this._subsApplication.getSubscriptionById(id);
    return res.status(response.code).json(response);
  }

  @Post('')
  public async createSubscription(
    @Body() dto: ICreateSubscription,
    @Res() res: Response,
  ) {
    const response = await this._subsApplication.createSubscription(dto);
    return res.status(response.code).json(response);
  }
}
