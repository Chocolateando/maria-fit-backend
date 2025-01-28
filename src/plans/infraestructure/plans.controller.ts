import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PlansApplication } from '../application/plans.application';
import { Response } from 'express';
import { ICreatePlanDTO } from '../../users/infraestructure/dtos/dtos';

@ApiTags('plans')
@Controller('api/v1/plans')
export class PlansController {
  constructor(private readonly _plansApplication: PlansApplication) {}

  @Get()
  public async getPlans(@Res() res: Response) {
    const response = await this._plansApplication.getPlans();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  public async getPlanById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._plansApplication.getPlanById(id);
    return res.status(response.code).json(response);
  }

  @Post('')
  public async createPlan(@Body() dto: ICreatePlanDTO, @Res() res: Response) {
    const response = await this._plansApplication.createPlan(dto);
    return res.status(response.code).json(response);
  }
}
