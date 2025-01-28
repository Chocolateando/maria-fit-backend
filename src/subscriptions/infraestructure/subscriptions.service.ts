import { Injectable, Logger } from '@nestjs/common';
import { SubscriptionsRepository } from '../domain/subscriptions.repository';
import { SubscriptionEntity } from './persistence/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class SubscriptionsService implements SubscriptionsRepository {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectRepository(SubscriptionEntity)
    private usersRepository: Repository<SubscriptionEntity>,
  ) {}

  public async createSubscription(
    subscription: SubscriptionEntity,
  ): Promise<boolean> {
    this.logger.debug(
      `Executing query: createSubscription (${JSON.stringify(subscription)})`,
    );
    try {
      const subscriptionDB = this.usersRepository.create(subscription);
      await this.usersRepository.save(subscriptionDB);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing createSubscription (${JSON.stringify(
          subscription,
        )}), error: ${error}`,
      );
      return false;
    }
  }

  public async getSubscriptionById(
    id: string,
  ): Promise<SubscriptionEntity | null> {
    this.logger.debug(`Executing query: getSubscriptionById (${id})`);
    try {
      return await this.usersRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
    } catch (error) {
      this.logger.error(
        `Error executing getSubscriptionById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getSubscriptions(): Promise<SubscriptionEntity[]> {
    this.logger.debug(`Executing query: getSubscriptions`);
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Error executing getSubscriptions, error: ${error}`);
      return null;
    }
  }
}
