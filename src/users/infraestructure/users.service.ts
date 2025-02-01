import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './persistence/user.entity';
import { ObjectId } from 'mongodb';
import { UsersRepository } from '../domain/users.repository';
import { User } from '../domain/users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements UsersRepository {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: User): Promise<UserEntity> {
    this.logger.debug(`Executing query: createUser (${JSON.stringify(user)})`);
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(
        `Error executing query createUser (${JSON.stringify(user)}), error: ${error}`,
      );
      return null;
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    this.logger.debug(`Executing query: deleteUser (${id})`);
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Error executing query deleteUser (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getUserById(id: string): Promise<UserEntity> {
    this.logger.debug(`Executing query: getUserById (${id})`);
    try {
      return this.usersRepository.findOne({ where: { _id: new ObjectId(id) } });
    } catch (error) {
      this.logger.error(
        `Error executing query getUserById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    this.logger.debug(`Executing query: getUsers`);
    try {
      return this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Error executing query getUsers, error: ${error}`);
      return null;
    }
  }

  public async updateUser(user: User): Promise<boolean> {
    this.logger.debug(`Executing query: updateUser (${JSON.stringify(user)})`);
    try {
      await this.usersRepository.update(user._id, user.toEntity());
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query updateUser (${JSON.stringify(user)}), error: ${error}`,
      );
      return false;
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    this.logger.debug(`Executing query: getUserByEmail (${email})`);
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      this.logger.error(
        `Error executing query getUserByEmail (${email}), error: ${error}`,
      );
      return null;
    }
  }
}
