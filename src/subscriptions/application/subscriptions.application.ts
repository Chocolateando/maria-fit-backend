import { HttpStatus, Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from '../domain/subscriptions.repository';
import { IResponse } from '../../shared/domain/response';
import { Subscription } from '../domain/subscription';
import { ICreateSubscription } from '../infraestructure/dtos/dtos';

@Injectable()
export class SubscriptionsApplication {
  constructor(
    private readonly _subscriptionsRepository: SubscriptionsRepository,
  ) {}

  public async createSubscription(
    subs: ICreateSubscription,
  ): Promise<IResponse<boolean>> {
    const newSubscription = Subscription.parseDto(subs);
    const result = await this._subscriptionsRepository.createSubscription(
      newSubscription.toEntity(),
    );
    if (!result) {
      return {
        data: false,
        error: true,
        msg: 'No se pudo crear la subscripcion',
        code: HttpStatus.ACCEPTED,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.CREATED,
      type: 'success',
    };
  }

  public async getSubscriptionById(
    id: string,
  ): Promise<IResponse<Subscription | null>> {
    const subsDb = await this._subscriptionsRepository.getSubscriptionById(id);
    if (!subsDb) {
      return {
        data: null,
        error: true,
        msg: 'No se pudo obtener la subscripcion',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const subscription = Subscription.parseEntity(subsDb);
    return {
      data: subscription,
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getSubscriptions(): Promise<IResponse<Subscription[]>> {
    const subsDb = await this._subscriptionsRepository.getSubscriptions();
    if (!subsDb) {
      return {
        data: [],
        error: true,
        msg: 'No se pudo obtener las subscripciones',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const subscriptions = subsDb.map((subs) => Subscription.parseEntity(subs));

    return {
      data: subscriptions,
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
