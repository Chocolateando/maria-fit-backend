import { PlanEntity } from '../infraestructure/persistence/plan.entity';

export abstract class PlansRepository {
  abstract getPlans(): Promise<PlanEntity[]>;

  abstract getPlanById(id: string): Promise<PlanEntity | null>;

  abstract createPlan(plan: PlanEntity): Promise<boolean>;
}
