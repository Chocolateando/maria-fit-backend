import { RecipeEntity } from '../infraestructure/persistence/recipe.entity';

export abstract class RecipesRepository {
  abstract getRecipes(): Promise<RecipeEntity[]>;

  abstract getRecipeById(id: string): Promise<RecipeEntity>;

  abstract createRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;

  abstract updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;

  abstract deleteRecipe(id: string): Promise<boolean>;
}
