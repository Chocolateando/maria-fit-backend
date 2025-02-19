import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { FavoritesApplication } from '../application/favorites.application';
import { IFavoriteDTO } from './dtos/dtos';
import { Response } from 'express';
import { IResponse } from '../../shared/domain/response';

@ApiBearerAuth()
@ApiTags('favorites')
@Controller('api/v1/favorites')
export class FavoritesController {
  constructor(private readonly _favApplication: FavoritesApplication) {}

  @Post('')
  @ApiOperation({ summary: 'Create Favorite' })
  @ApiResponse({
    status: 201,
    description: 'Favorite created',
    type: IResponse,
  })
  public async createFavorite(@Body() dto: IFavoriteDTO, @Res() res: Response) {
    const response = await this._favApplication.createFavorite(dto);
    return res.status(response.code).json(response);
  }

  @Post(':id')
  @ApiBody({ type: IFavoriteDTO })
  @ApiOperation({ summary: 'Delete Favorite' })
  @ApiResponse({
    status: 201,
    description: 'Favorite created',
    type: IResponse,
  })
  public async deleteFavorite(@Param('id') id: string, @Res() res: Response) {
    const response = await this._favApplication.deleteFavorite(id);
    return res.status(response.code).json(response);
  }

  @Post(':userId')
  @ApiResponse({
    status: 201,
    description: 'Get Favorites',
    type: IResponse,
  })
  @ApiOperation({ summary: 'Get Favorites' })
  public async getFavorites(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const response = await this._favApplication.getFavorites(userId);
    return res.status(response.code).json(response);
  }
}
