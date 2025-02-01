import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './persistence/plan.entity';
import { PlansRepository } from '../domain/plans.repository';
import { PlansService } from './plans.service';
import { PlansApplication } from '../application/plans.application';
import { PlansController } from './plans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [
    { provide: PlansRepository, useClass: PlansService },
    PlansApplication,
  ],
  controllers: [PlansController],
  exports: [PlansRepository],
})
export class PlansModule {}
