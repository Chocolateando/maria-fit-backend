import { User } from './users';
import { UserEntity } from '../infraestructure/persistence/user.entity';

export abstract class UsersRepository {
  abstract createUser(user: User): Promise<UserEntity>;

  abstract updateUser(user: User): Promise<boolean>;

  abstract deleteUser(id: number): Promise<boolean>;

  abstract getUserById(id: string): Promise<UserEntity>;

  abstract getUsers(): Promise<UserEntity[]>;

  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
}
