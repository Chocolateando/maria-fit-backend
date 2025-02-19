import { ObjectId } from 'mongodb';
import { RecipeEntity } from '../infraestructure/persistence/recipe.entity';
import { IRecipeDTO } from '../infraestructure/dtos/dtos';

export class Recipe {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  type: string;
  difficulty: string;
  objetive: string;
  portions: number;
  preparationtime: string;
  ingredients: Ingredients[];
  instructions: Instructions[];
  tags: string;
  firstTag: string;
  tipsAndTricks: Instructions[];
  subscriptionType: string;
  image_url: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;

  public static parseEntity(recipe: RecipeEntity): Recipe {
    return {
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      type: recipe.type,
      difficulty: recipe.difficulty,
      objetive: recipe.objetive,
      portions: recipe.portions,
      preparationtime: recipe.preparationtime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags,
      firstTag: recipe.firstTag,
      tipsAndTricks: recipe.tipsAndTricks,
      subscriptionType: recipe.subscriptionType,
      image_url: recipe.image_url,
      status: recipe.status,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }

  public static parseDTO(recipe: IRecipeDTO): Recipe {
    return {
      _id: new ObjectId(recipe.id) || new ObjectId(),
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      type: recipe.type,
      difficulty: recipe.difficulty,
      objetive: recipe.objetive,
      portions: recipe.portions,
      preparationtime: recipe.preparationtime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags,
      firstTag: recipe.firstTag,
      tipsAndTricks: recipe.tipsAndTricks,
      subscriptionType: recipe.subscriptionType,
      image_url: recipe.image_url,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

class Ingredients {
  name: string;
  amount: string;
}

class Instructions {
  orderNum: number;
  instruction: string;
}
