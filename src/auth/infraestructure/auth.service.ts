import { Injectable, Logger } from '@nestjs/common';
import { ICredentials, ISession } from './dtos/auth';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/domain/users';
import { AuthRepository } from '../domain/auth.repository';
import { AuthEntity } from './persistence/auth.entity';
import { Auth } from '../domain/auth';

@Injectable()
export class AuthService implements AuthRepository {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(AuthEntity)
    private usersRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(cred: ICredentials): Promise<ISession | null> {
    this.logger.debug(`Executing query: login (${cred.email})`);
    try {
      const userDb = await this.usersRepository.findOne({
        where: { email: cred.email },
      });
      if (!userDb) return null;
      const user = Auth.parse(userDb);
      const isEquals = await User.validatePassword(
        cred.password,
        user.password_hash,
      );
      if (!isEquals) return null;
      const payload = { id: user.id, role: user.uType };
      const token = await this.jwtService.signAsync(payload);
      return {
        access_token: token,
        refresh_token: token,
      };
    } catch (error) {
      this.logger.error(
        `Error executing login (${cred.email}), error: ${error}`,
      );
      return null;
    }
  }
}
