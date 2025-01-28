import { SubscriptionEntity } from '../infraestructure/persistence/subscription.entity';

export abstract class SubscriptionsRepository {
  abstract getSubscriptions(): Promise<SubscriptionEntity[]>;

  abstract getSubscriptionById(id: string): Promise<SubscriptionEntity | null>;

  abstract createSubscription(
    subscription: SubscriptionEntity,
  ): Promise<boolean>;
}
