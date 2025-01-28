import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './persistence/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsApplication } from '../application/subscriptions.application';
import { SubscriptionsController } from './subscriptions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    { provide: SubscriptionEntity, useClass: SubscriptionsService },
    SubscriptionsApplication,
  ],
  controllers: [SubscriptionsController],
})
export class SubscriptionsModule {}
