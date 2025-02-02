import { HttpStatus, Injectable } from '@nestjs/common';
import { RecipesRepository } from '../domain/recipes.repository';
import { IResponse } from '../../shared/domain/response';
import { Recipe } from '../domain/recipe';
import { IRecipeDTO } from '../infraestructure/dtos/dtos';

@Injectable()
export class RecipesApplication {
  constructor(private readonly _recipesRepository: RecipesRepository) {}

  public async getRecipes(): Promise<IResponse<Recipe[]>> {
    const recipes = await this._recipesRepository.getRecipes();
    if (!recipes) {
      return {
        data: null,
        error: true,
        mgs: 'No se pudo obtener las recetas',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    const data = recipes.map((recipe) => Recipe.parseEntity(recipe));
    return {
      data: data,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getRecipeById(id: string): Promise<IResponse<Recipe | null>> {
    const recipeDB = await this._recipesRepository.getRecipeById(id);
    if (!recipeDB) {
      return {
        data: null,
        error: true,
        mgs: 'No se encontro la receta',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const recipe = Recipe.parseEntity(recipeDB);
    return {
      data: recipe,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async deleteRecipe(id: string): Promise<IResponse<boolean>> {
    const result = await this._recipesRepository.deleteRecipe(id);
    if (!result) {
      return {
        data: false,
        error: true,
        mgs: 'No se pudo eliminar la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async createRecipe(data: IRecipeDTO): Promise<IResponse<Recipe>> {
    const recipe = Recipe.parseDTO(data);
    const recipeDB = await this._recipesRepository.createRecipe(recipe);
    if (!recipeDB) {
      return {
        data: null,
        error: true,
        mgs: 'No se pudo crear la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: Recipe.parseEntity(recipeDB),
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async updateRecipe(data: IRecipeDTO): Promise<IResponse<Recipe>> {
    const recipe = Recipe.parseDTO(data);
    const recipeDB = await this._recipesRepository.updateRecipe(recipe);
    if (!recipeDB) {
      return {
        data: null,
        error: true,
        mgs: 'No se pudo actualizar la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: Recipe.parseEntity(recipeDB),
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
