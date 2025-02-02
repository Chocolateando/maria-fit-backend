import { FilterEntity } from '../infraestructure/persistence/filter.entity';

export abstract class FiltersRepository {
  abstract getFilters(): Promise<FilterEntity[]>;

  abstract createFilter(filter: FilterEntity): Promise<FilterEntity>;
}
