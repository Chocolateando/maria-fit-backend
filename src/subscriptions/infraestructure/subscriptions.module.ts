import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './persistence/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsApplication } from '../application/subscriptions.application';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsRepository } from '../domain/subscriptions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    { provide: SubscriptionsRepository, useClass: SubscriptionsService },
    SubscriptionsApplication,
  ],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsRepository],
})
export class SubscriptionsModule {}
