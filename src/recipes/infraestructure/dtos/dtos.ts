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
  ingredients: IngredientDTO[];
  instructions: InstructionDTO[];
  tags: string;
  firstTag: string;
  tipsAndTricks: InstructionDTO[];
  subscriptionType: string;
  image_url: string;
}

export interface IngredientDTO {
  name: string;
  amount: string;
}

export interface InstructionDTO {
  orderNum: number;
  instruction: string;
}
