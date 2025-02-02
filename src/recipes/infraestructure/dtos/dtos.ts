export interface IRecipeDTO {
  id?: string;
  title: string;
  description: string;
  category: string;
  type: string;
  difficulty: string;
  objetive: string;
  portions: number;
  preparationtime: string;
  ingredients: IngredientsDTO[];
  instructions: InstructionsDTO[];
  tags: string;
  firstTag: string;
  tipsAndTricks: InstructionsDTO[];
  subscriptionType: string;
  image_url: string;
}

export interface IngredientsDTO {
  ingredientId: string;
  name: string;
  amount: string;
}

export interface InstructionsDTO {
  orderNum: number;
  instruction: string;
}
