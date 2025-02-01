import { HttpStatus, Injectable } from '@nestjs/common';
import { PlansRepository } from '../domain/plans.repository';
import { IResponse } from '../../shared/domain/response';
import { Plan } from '../domain/plan';
import { ICreatePlanDTO } from '../infraestructure/dtos/dtos';

@Injectable()
export class PlansApplication {
  constructor(private readonly _plansRepository: PlansRepository) {}

  public async getPlanById(id: string): Promise<IResponse<Plan | null>> {
    const planDB = await this._plansRepository.getPlanById(id);
    if (!planDB) {
      return {
        data: null,
        error: true,
        mgs: 'No se pudo obtener el plan',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const plan = Plan.parseEntity(planDB);
    return {
      data: plan,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getPlans(): Promise<IResponse<Plan[]>> {
    const plansDB = await this._plansRepository.getPlans();
    if (!plansDB) {
      return {
        data: [],
        error: true,
        mgs: 'No se pudo obtener los planes',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const plans = plansDB.map((plan) => Plan.parseEntity(plan));

    return {
      data: plans,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async createPlan(plan: ICreatePlanDTO): Promise<IResponse<boolean>> {
    const newPlan = Plan.parseDto(plan);
    const result = await this._plansRepository.createPlan(newPlan.toEntity());
    if (!result) {
      return {
        data: false,
        error: true,
        mgs: 'No se pudo crear el plan',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.CREATED,
      type: 'success',
    };
  }
}
