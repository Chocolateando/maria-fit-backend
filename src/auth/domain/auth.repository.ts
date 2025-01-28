import { ICredentials, ISession } from '../infraestructure/dtos/auth';

export abstract class AuthRepository {
  abstract login(cred: ICredentials): Promise<ISession | null>;
}
