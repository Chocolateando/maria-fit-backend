import { HttpStatus, Injectable } from '@nestjs/common';
import { RecipesRepository } from '../domain/recipes.repository';
import { IResponse } from '../../shared/domain/response';
import { Recipe } from '../domain/recipe';
import { IRecipeDTO } from '../infraestructure/dtos/dtos';
import { FavoritesRepository } from '../../favorites/domain/favorites.repository';

@Injectable()
export class RecipesApplication {
  constructor(
    private readonly _recipesRepository: RecipesRepository,
    private readonly _favRepository: FavoritesRepository,
  ) {}

  public async getRecipes(): Promise<IResponse<Recipe[]>> {
    const recipes = await this._recipesRepository.getRecipes();
    if (!recipes) {
      return {
        data: null,
        error: true,
        msg: 'No se pudo obtener las recetas',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    const data = recipes.map((recipe) => Recipe.parseEntity(recipe));
    return {
      data: data,
      error: false,
      msg: 'Procesado correctamente',
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
        msg: 'No se encontro la receta',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const recipe = Recipe.parseEntity(recipeDB);
    return {
      data: recipe,
      error: false,
      msg: 'Procesado correctamente',
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
        msg: 'No se pudo eliminar la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      msg: 'Procesado correctamente',
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
        msg: 'No se pudo crear la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: Recipe.parseEntity(recipeDB),
      error: false,
      msg: 'Procesado correctamente',
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
        msg: 'No se pudo actualizar la receta',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: Recipe.parseEntity(recipeDB),
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getFavorites(userId: string): Promise<IResponse<Recipe[]>> {
    const favorites = await this._favRepository.getFavorites(userId);
    if (!favorites) {
      return {
        data: null,
        error: true,
        msg: 'No se pudieron obtener las recetas favoritas',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const recipes = await this._recipesRepository.getRecipesByIds(
      favorites.map((fav) => fav.recipe.toString()),
    );

    if (!recipes) {
      return {
        data: null,
        error: true,
        msg: 'No se pudieron obtener las recetas favoritas',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    return {
      data: recipes.map((fav) => Recipe.parseEntity(fav)),
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getIngredients(): Promise<IResponse<string[]>> {
    const recipes = await this._recipesRepository.getRecipes();
    if (!recipes) {
      return {
        data: null,
        error: true,
        msg: 'No se pudieron obtener los ingredientes',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    const ingredients = recipes
      .map((recipe) => recipe.ingredients)
      .reduce((acc, val) => acc.concat(val), [])
      .map((ingredient) => ingredient.name.trim());

    return {
      data: Array.from(new Set(ingredients)),
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
