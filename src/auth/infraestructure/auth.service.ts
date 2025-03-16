import { Injectable, Logger } from '@nestjs/common';
import { ICredentials } from './dtos/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRepository } from '../domain/auth.repository';
import { AuthEntity } from './persistence/auth.entity';

@Injectable()
export class AuthService implements AuthRepository {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(AuthEntity)
    private usersRepository: Repository<AuthEntity>,
  ) {}

  public async login(cred: ICredentials): Promise<AuthEntity | null> {
    this.logger.debug(`Executing query: login (${cred.email})`);
    try {
      return await this.usersRepository.findOne({
        where: { email: cred.email },
      });
    } catch (error) {
      this.logger.error(
        `Error executing login (${cred.email}), error: ${error}`,
      );
      return null;
    }
  }
}
