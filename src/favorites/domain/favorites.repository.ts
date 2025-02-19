import { FavoriteEntity } from '../infraestructure/persistence/favorite.entity';

export abstract class FavoritesRepository {
  abstract createFavorite(data: FavoriteEntity): Promise<boolean>;

  abstract deleteFavorite(id: string): Promise<boolean>;

  abstract getFavorites(userId: string): Promise<FavoriteEntity[]>;
}
