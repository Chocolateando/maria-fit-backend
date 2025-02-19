import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RecipesApplication } from '../application/recipes.application';
import { Response } from 'express';
import { IRecipeDTO } from './dtos/dtos';
import { PermissionGuard } from '../../shared/infraestructure/guards/permission.guard';
import { IResponse } from '../../shared/domain/response';

@ApiBearerAuth()
@ApiTags('recipes')
@Controller('api/v1/recipes')
export class RecipesController {
  constructor(private readonly _recipesApplication: RecipesApplication) {}

  @Post()
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Create Recipe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create Recipes',
    type: IResponse,
  })
  public async createRecipe(@Body() dto: IRecipeDTO, @Res() res: Response) {
    const response = await this._recipesApplication.createRecipe(dto);
    return res.status(response.code).json(response);
  }

  @Put()
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Update Recipe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Recipes',
    type: IResponse,
  })
  public async updateRecipe(@Body() dto: IRecipeDTO, @Res() res: Response) {
    const response = await this._recipesApplication.updateRecipe(dto);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Delete Recipe' })
  public async deleteRecipe(@Param('id') id: string, @Res() res: Response) {
    const response = await this._recipesApplication.deleteRecipe(id);
    return res.status(response.code).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Get Recipes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Recipes',
    type: IResponse,
  })
  public async getRecipes(@Res() res: Response) {
    const response = await this._recipesApplication.getRecipes();
    return res.status(response.code).json(response);
  }

  @Get('favorites/:userId')
  @ApiOperation({ summary: 'Get Favorites Recipes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Favorites Recipes',
    type: IResponse,
  })
  public async getFavorites(@Param('userId') id: string, @Res() res: Response) {
    const response = await this._recipesApplication.getFavorites(id);
    return res.status(response.code).json(response);
  }

  @Get('ingredients')
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Get Ingredients' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Ingredients',
    type: IResponse,
  })
  public async getIngredients(@Res() res: Response) {
    const response = await this._recipesApplication.getIngredients();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Recipe by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Recipe by id',
    type: IResponse,
  })
  public async getRecipeById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._recipesApplication.getRecipeById(id);
    return res.status(response.code).json(response);
  }
}
