import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../domain/users.repository';
import { User } from '../domain/users';
import { IResponse } from '../../shared/domain/response';

@Injectable()
export class ApplicationService {
  constructor(private readonly repository: UsersRepository) {}

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

    return {
      data: user,
      error: false,
      mgs: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
