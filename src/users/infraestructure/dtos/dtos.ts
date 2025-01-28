export interface ICreatePlanDTO {
  type: string;
  price: string;
  currency: string;
  cicleType: string;
  cicleNumber: number;
  description: string;
  characteristics: string[];
  status: boolean;
}
