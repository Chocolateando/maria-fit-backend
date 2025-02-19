import { HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../domain/favorites.repository';
import { IFavoriteDTO } from '../infraestructure/dtos/dtos';
import { Favorite } from '../domain/favorite';
import { IResponse } from '../../shared/domain/response';

@Injectable()
export class FavoritesApplication {
  constructor(private readonly _favRepository: FavoritesRepository) {}

  public async createFavorite(data: IFavoriteDTO): Promise<IResponse<boolean>> {
    const favorite = Favorite.parseDto(data);
    const result = await this._favRepository.createFavorite(
      favorite.toEntity(),
    );
    if (!result) {
      return {
        data: false,
        error: true,
        msg: 'No se pudo crear el favorito',
        code: HttpStatus.ACCEPTED,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.CREATED,
      type: 'success',
    };
  }

  public async deleteFavorite(favorite: string) {
    const result = await this._favRepository.deleteFavorite(favorite);
    if (!result) {
      return {
        data: false,
        error: true,
        msg: 'No se pudo eliminar el favorito',
        code: HttpStatus.ACCEPTED,
        type: 'error',
      };
    }

    return {
      data: true,
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }

  public async getFavorites(userId: string): Promise<IResponse<Favorite[]>> {
    const favorites = await this._favRepository.getFavorites(userId);
    if (!favorites) {
      return {
        data: null,
        error: true,
        msg: 'No se pudieron obtener los favoritos',
        code: HttpStatus.NOT_FOUND,
        type: 'error',
      };
    }

    return {
      data: favorites.map((fav) => Favorite.parseEntity(fav)),
      error: false,
      msg: 'Procesado correctamente',
      code: HttpStatus.OK,
      type: 'success',
    };
  }
}
