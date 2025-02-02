import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { RecipesApplication } from '../application/recipes.application';
import { Response } from 'express';
import { IRecipeDTO } from './dtos/dtos';

@ApiBearerAuth()
@ApiTags('recipes')
@Controller('api/v1/recipes')
export class RecipesController {
  constructor(private readonly _recipesApplication: RecipesApplication) {}

  @Post()
  public async createRecipe(@Body() dto: IRecipeDTO, @Res() res: Response) {
    const response = await this._recipesApplication.createRecipe(dto);
    return res.status(response.code).json(response);
  }

  @Put()
  public async updateRecipe(@Body() dto: IRecipeDTO, @Res() res: Response) {
    const response = await this._recipesApplication.updateRecipe(dto);
    return res.status(response.code).json(response);
  }

  @Delete(':id')
  public async deleteRecipe(@Param('id') id: string, @Res() res: Response) {
    const response = await this._recipesApplication.deleteRecipe(id);
    return res.status(response.code).json(response);
  }

  @Get()
  public async getRecipes(@Res() res: Response) {
    const response = await this._recipesApplication.getRecipes();
    return res.status(response.code).json(response);
  }

  @Get(':id')
  public async getRecipeById(@Param('id') id: string, @Res() res: Response) {
    const response = await this._recipesApplication.getRecipeById(id);
    return res.status(response.code).json(response);
  }
}
