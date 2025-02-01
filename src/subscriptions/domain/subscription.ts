import { SubscriptionEntity } from '../infraestructure/persistence/subscription.entity';
import { ICreateSubscription } from '../infraestructure/dtos/dtos';
import { ObjectId } from 'mongodb';

export class Subscription {
  id: string;
  user: string;
  plan: string;
  initDate: Date;
  endDate: Date;
  subscription_status: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    user: string,
    plan: string,
    initDate: Date,
    endDate: Date,
    subscription_status: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.user = user;
    this.plan = plan;
    this.initDate = initDate;
    this.endDate = endDate;
    this.subscription_status = subscription_status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static parseEntity(entity: SubscriptionEntity): Subscription {
    return new Subscription(
      entity._id.toString(),
      entity.user.toString(),
      entity.plan.toString(),
      entity.initDate,
      entity.endDate,
      entity.subscription_status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  public static parseDto(subs: ICreateSubscription) {
    return new Subscription(
      null,
      subs.user,
      subs.plan,
      new Date(subs.initDate),
      new Date(subs.endDate),
      subs.subscription_status,
    );
  }

  public toEntity(): SubscriptionEntity {
    return {
      _id: this.id ? new ObjectId(this.id) : null,
      user: new ObjectId(this.user),
      plan: new ObjectId(this.plan),
      initDate: this.initDate,
      endDate: this.endDate,
      subscription_status: this.subscription_status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
