export interface IResponse<T = any> {
  error: boolean;
  data: T;
  mgs: string;
  code: number;
  type: string;
}
