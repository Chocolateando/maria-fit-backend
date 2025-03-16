import { ICredentials } from '../infraestructure/dtos/auth';
import { AuthEntity } from '../infraestructure/persistence/auth.entity';

export abstract class AuthRepository {
  abstract login(cred: ICredentials): Promise<AuthEntity | null>;
}
