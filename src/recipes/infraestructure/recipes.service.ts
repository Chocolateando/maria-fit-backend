import { Injectable, Logger } from '@nestjs/common';
import { RecipesRepository } from '../domain/recipes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './persistence/recipe.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class RecipesService implements RecipesRepository {
  private readonly logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(RecipeEntity)
    private usersRepository: Repository<RecipeEntity>,
  ) {}

  public async createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
    this.logger.debug(
      `Executing query: createRecipe (${JSON.stringify(recipe)})`,
    );
    try {
      const recipeDB = this.usersRepository.create(recipe);
      await this.usersRepository.save(recipeDB);
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
      await this.usersRepository.update(recipe._id, recipe);
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
      await this.usersRepository.delete(id);
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
      return await this.usersRepository.findOne({
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
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Error executing getRecipes, error: ${error}`);
      return null;
    }
  }
}
