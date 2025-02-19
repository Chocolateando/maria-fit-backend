import { Injectable, Logger } from '@nestjs/common';
import { RecipesRepository } from '../domain/recipes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { RecipeEntity } from './persistence/recipe.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class RecipesService implements RecipesRepository {
  private readonly logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(RecipeEntity)
    private recipesRepository: MongoRepository<RecipeEntity>,
  ) {}

  public async createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
    this.logger.debug(
      `Executing query: createRecipe (${JSON.stringify(recipe)})`,
    );
    try {
      const recipeDB = this.recipesRepository.create(recipe);
      await this.recipesRepository.save(recipeDB);
      return recipeDB;
    } catch (error) {
      this.logger.error(
        `Error executing createRecipe (${JSON.stringify(recipe)}), error: ${error}`,
      );
      return null;
    }
  }

  public async updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
    this.logger.debug(
      `Executing query: updateRecipe (${JSON.stringify(recipe)})`,
    );
    try {
      await this.recipesRepository.update(recipe._id, recipe);
      return recipe;
    } catch (error) {
      this.logger.error(
        `Error executing updateRecipe (${JSON.stringify(recipe)}), error: ${error}`,
      );
      return null;
    }
  }

  public async deleteRecipe(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteRecipe (${id})`);
    try {
      await this.recipesRepository.delete(id);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing deleteRecipe (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getRecipeById(id: string): Promise<RecipeEntity> {
    this.logger.debug(`Executing query: getRecipeById (${id})`);
    try {
      return await this.recipesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
    } catch (error) {
      this.logger.error(
        `Error executing getRecipeById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getRecipes(): Promise<RecipeEntity[]> {
    this.logger.debug(`Executing query: getRecipes`);
    try {
      return await this.recipesRepository.find();
    } catch (error) {
      this.logger.error(`Error executing getRecipes, error: ${error}`);
      return null;
    }
  }

  public async getRecipesByIds(ids: string[]): Promise<RecipeEntity[]> {
    this.logger.debug(`Executing query: getFavoriteRecipes`);
    try {
      return await this.recipesRepository.find({
        where: { _id: { $in: ids.map((id) => new ObjectId(id)) } },
      });
    } catch (error) {
      this.logger.error(`Error executing getFavoriteRecipes, error: ${error}`);
      return null;
    }
  }
}
