import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../domain/users.repository';
import { User } from '../domain/users';
import { IResponse } from '../../shared/domain/response';
import { ICreateUserDto } from '../infraestructure/dtos/dtos';
import { HashText } from '../../shared/infraestructure/security/security';
import { PlansRepository } from '../../plans/domain/plans.repository';
import { SubscriptionsRepository } from '../../subscriptions/domain/subscriptions.repository';
import { Subscription } from '../../subscriptions/domain/subscription';
import { ObjectId } from 'mongodb';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly planRepository: PlansRepository,
    private readonly subsRepository: SubscriptionsRepository,
  ) {}

  public async getUsers(): Promise<IResponse<User[]>> {
    const usersDB = await this.repository.getUsers();
    if (!usersDB) {
      return {
        data: [],
        error: true,
        mgs: 'No se pudo obtener los usuarios',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const users = usersDB.map((user) => {
      const userParsed = User.parse(user);
      userParsed.sanitize();
      return userParsed;
    });

    return {
      data: users,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getUserById(id: string): Promise<IResponse<User>> {
    const userDB = await this.repository.getUserById(id);
    if (!userDB) {
      return {
        data: null,
        error: true,
        mgs: 'No se pudo obtener el usuario',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    const user = User.parse(userDB);
    user.sanitize();

    const subs = await this.subsRepository.getSubscriptionByUserId(id);

    const res: IResponse = {
      data: null,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };

    if (!subs) {
      res.data = user;
      return res;
    }

    const plan = await this.planRepository.getPlanById(subs.plan.toString());
    if (!plan) {
      res.data = user;
      return res;
    }

    user.subscription = {
      endDate: subs.endDate,
      status: subs.subscription_status,
      initDate: subs.initDate,
    };

    user.planType = {
      amount: plan.price,
      name: plan.type,
      cicleType: plan.cicleType,
      currency: plan.currency,
    };

    res.data = user;
    return res;
  }

  public async createUser(
    userDto: ICreateUserDto,
  ): Promise<IResponse<boolean>> {
    const user = new User(
      new ObjectId(),
      userDto.name,
      userDto.lastname,
      userDto.birthday,
      userDto.tall,
      userDto.weight,
      userDto.phone,
      userDto.email,
      await HashText(userDto.password),
    );

    const userDB = await this.repository.getUserByEmail(user.email);
    if (userDB) {
      return {
        data: false,
        error: true,
        mgs: 'Ya existe un usuario con los datos proporcionados',
        code: HttpStatus.CONFLICT,
        type: 'error',
      };
    }

    const userSave = await this.repository.createUser(user);
    if (!userSave) {
      return {
        data: false,
        error: true,
        mgs: 'No se pudo crear el usuario',
        code: HttpStatus.ACCEPTED,
        type: 'error',
      };
    }

    const plan = await this.planRepository.getPlanByType('Free');
    if (!plan) {
      return {
        data: false,
        error: true,
        mgs: 'No se pudo obtener el plan Free',
        code: HttpStatus.ACCEPTED,
        type: 'error',
      };
    }

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 30 * plan.cicleNumber);

    const newSubs = new Subscription(
      null,
      userSave._id.toString(),
      plan._id.toString(),
      currentDate,
      futureDate,
      'free',
    );
    const isCreated = await this.subsRepository.createSubscription(
      newSubs.toEntity(),
    );
    if (!isCreated) {
      return {
        data: false,
        error: true,
        mgs: 'No se pudo crear la suscripción',
        code: HttpStatus.ACCEPTED,
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
