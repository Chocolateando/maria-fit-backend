import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { FiltersApplication } from '../application/filters.application';
import { Response } from 'express';
import { FilterDTO } from './dtos/dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../../shared/domain/response';
import { Public } from '../../shared/infraestructure/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('filters')
@Controller('api/v1/filters')
export class FiltersController {
  constructor(private readonly _filtersApplication: FiltersApplication) {}

  @Post('')
  @ApiOperation({ summary: 'Create filter' })
  @ApiBody({ type: FilterDTO })
  @ApiResponse({ status: 201, description: 'Filter created', type: IResponse })
  public async createFilter(@Body() dto: FilterDTO, @Res() res: Response) {
    const response = await this._filtersApplication.createFilter(dto);
    return res.status(response.code).json(response);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get filters' })
  @ApiResponse({ status: 200, description: 'Filters found', type: IResponse })
  public async getFilters(@Res() res: Response) {
    const response = await this._filtersApplication.getFilters();
    return res.status(response.code).json(response);
  }
}
