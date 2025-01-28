import { HttpStatus, Injectable } from '@nestjs/common';
import { ICredentials, ISession } from '../infraestructure/dtos/auth';
import { IResponse } from '../../shared/domain/response';
import { SanitizeEmail } from '../../shared/infraestructure/security/security';
import { AuthRepository } from '../domain/auth.repository';

@Injectable()
export class ApplicationServices {
  constructor(private readonly _authService: AuthRepository) {}

  public async login(cred: ICredentials): Promise<IResponse<ISession | null>> {
    if (!SanitizeEmail(cred.email)) {
      return {
        data: null,
        error: true,
        mgs: 'El correo no cumple con el formato requerido',
        code: HttpStatus.BAD_REQUEST,
        type: 'error',
      };
    }

    const session = await this._authService.login(cred);
    if (!session) {
      return {
        data: null,
        error: true,
        mgs: 'Usuario o contraseña incorrectos',
        code: HttpStatus.UNAUTHORIZED,
        type: 'error',
      };
    }

    return {
      data: session,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
