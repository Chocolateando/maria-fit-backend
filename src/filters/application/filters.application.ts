import { HttpStatus, Injectable } from '@nestjs/common';
import { FiltersRepository } from '../domain/filters.repository';
import { IResponse } from '../../shared/domain/response';
import { Filter } from '../domain/filter';
import { FilterDTO } from '../infraestructure/dtos/dtos';

@Injectable()
export class FiltersApplication {
  constructor(private readonly _filtersRepository: FiltersRepository) {}

  public async createFilter(dto: FilterDTO): Promise<IResponse<Filter>> {
    const filter = Filter.toDTO(dto);
    const filterDb = await this._filtersRepository.createFilter(
      filter.toEntity(),
    );

    if (!filterDb) {
      return {
        error: true,
        data: null,
        mgs: 'Error al crear el filtro',
        type: 'error',
        code: HttpStatus.ACCEPTED,
      };
    }

    return {
      error: false,
      data: filter,
      mgs: 'Filtro creado correctamente',
      type: 'success',
      code: HttpStatus.CREATED,
    };
  }

  public async getFilters(): Promise<IResponse<Filter[]>> {
    const filters = await this._filtersRepository.getFilters();

    if (!filters) {
      return {
        error: true,
        data: null,
        mgs: 'Error al obtener los filtros',
        type: 'error',
        code: HttpStatus.ACCEPTED,
      };
    }

    return {
      error: false,
      data: filters.map((filter) => Filter.parseEntity(filter)),
      mgs: 'Filtros obtenidos correctamente',
      type: 'success',
      code: HttpStatus.OK,
    };
  }
}
