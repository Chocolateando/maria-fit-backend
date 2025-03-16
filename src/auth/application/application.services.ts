import { HttpStatus, Injectable } from '@nestjs/common';
import { ICredentials, ISession } from '../infraestructure/dtos/auth';
import { IResponse } from '../../shared/domain/response';
import { SanitizeEmail } from '../../shared/infraestructure/security/security';
import { AuthRepository } from '../domain/auth.repository';
import { PlansRepository } from '../../plans/domain/plans.repository';
import { SubscriptionsRepository } from '../../subscriptions/domain/subscriptions.repository';
import { Auth } from '../domain/auth';
import { User } from '../../users/domain/users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApplicationServices {
  constructor(
    private readonly _authService: AuthRepository,
    private readonly planRepository: PlansRepository,
    private readonly subsRepository: SubscriptionsRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(cred: ICredentials): Promise<IResponse<ISession | null>> {
    if (!SanitizeEmail(cred.email)) {
      return {
        data: null,
        error: true,
        msg: 'El correo no cumple con el formato requerido',
        code: HttpStatus.BAD_REQUEST,
        type: 'error',
      };
    }

    const userDb = await this._authService.login(cred);
    if (!userDb) {
      return {
        data: null,
        error: true,
        msg: 'Usuario o contraseña incorrectos',
        code: HttpStatus.UNAUTHORIZED,
        type: 'error',
      };
    }

    const user = Auth.parse(userDb);
    const isEquals = await User.validatePassword(
      cred.password,
      user.password_hash,
    );
    if (!isEquals) {
      return {
        data: null,
        error: true,
        msg: 'Usuario o contraseña incorrectos',
        code: HttpStatus.UNAUTHORIZED,
        type: 'error',
      };
    }

    let plan = 'Free';
    const subs = await this.subsRepository.getSubscriptionByUserId(
      user.id.toString(),
    );
    if (subs) {
      const planDb = await this.planRepository.getPlanById(
        subs.plan.toString(),
      );
      if (planDb) {
        plan = planDb.type;
      }
    }

    const payload = { id: user.id, role: user.uType, plan: plan };
    const token = await this.jwtService.signAsync(payload);

    return {
      data: {
        access_token: token,
        refresh_token: token,
      },
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
