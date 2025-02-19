import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PlansApplication } from '../application/plans.application';
import { Response } from 'express';
import { ICreatePlanDTO } from './dtos/dtos';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';
import { IResponse } from '../../shared/domain/response';
import { PermissionGuard } from '../../shared/infraestructure/guards/permission.guard';

@ApiBearerAuth()
@ApiTags('plans')
@Controller('api/v1/plans')
export class PlansController {
  constructor(private readonly _plansApplication: PlansApplication) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get plans' })
  public async getPlans(@Res() res: Response) {
    const response = await this._plansApplication.getPlans();
    return res.status(response.code).json(response);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get plan by id' })
  public async getPlanById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._plansApplication.getPlanById(id);
    return res.status(response.code).json(response);
  }

  @UseGuards(PermissionGuard)
  @Post('')
  @ApiOperation({ summary: 'Create plan' })
  @ApiBody({ type: ICreatePlanDTO })
  @ApiResponse({ status: 201, description: 'Plan created', type: IResponse })
  public async createPlan(@Body() dto: ICreatePlanDTO, @Res() res: Response) {
    const response = await this._plansApplication.createPlan(dto);
    return res.status(response.code).json(response);
  }
}
