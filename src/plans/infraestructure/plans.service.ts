import { Injectable, Logger } from '@nestjs/common';
import { PlansRepository } from '../domain/plans.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEntity } from './persistence/plan.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PlansService implements PlansRepository {
  private readonly logger = new Logger(PlansService.name);

  constructor(
    @InjectRepository(PlanEntity)
    private usersRepository: Repository<PlanEntity>,
  ) {}

  public async getPlanById(id: string): Promise<PlanEntity> {
    this.logger.debug(`Executing query: getPlanById (${id})`);
    try {
      return await this.usersRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
    } catch (error) {
      this.logger.error(`Error executing getPlanById (${id}), error: ${error}`);
      return null;
    }
  }

  public async getPlans(): Promise<PlanEntity[]> {
    this.logger.debug(`Executing query: getPlans`);
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Error executing getPlans, error: ${error}`);
      return null;
    }
  }

  public async createPlan(plan: PlanEntity): Promise<boolean> {
    this.logger.debug(`Executing query: createPlan (${JSON.stringify(plan)})`);
    try {
      const planDB = this.usersRepository.create(plan);
      await this.usersRepository.save(planDB);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing createPlan (${JSON.stringify(plan)}), error: ${error}`,
      );
      return false;
    }
  }
}
