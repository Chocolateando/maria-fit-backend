import { Injectable, Logger } from '@nestjs/common';
import { FiltersRepository } from '../domain/filters.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterEntity } from './persistence/filter.entity';

@Injectable()
export class FiltersService implements FiltersRepository {
  private readonly logger = new Logger(FiltersService.name);

  constructor(
    @InjectRepository(FilterEntity)
    private usersRepository: Repository<FilterEntity>,
  ) {}

  public async createFilter(filter: FilterEntity): Promise<FilterEntity> {
    this.logger.debug(
      `Executing query: createFilter (${JSON.stringify(filter)})`,
    );
    try {
      let filterDB = this.usersRepository.create(filter);
      filterDB = await this.usersRepository.save(filterDB);
      return filterDB;
    } catch (error) {
      this.logger.error(
        `Error executing createFilter (${JSON.stringify(filter)}), error: ${error}`,
      );
      return null;
    }
  }

  public async getFilters(): Promise<FilterEntity[]> {
    this.logger.debug(`Executing query: getFilters`);
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Error executing getFilters, error: ${error}`);
      return null;
    }
  }
}
