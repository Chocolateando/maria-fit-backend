import { Injectable, Logger } from '@nestjs/common';
import { FavoritesRepository } from '../domain/favorites.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './persistence/favorite.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class FavoritesService implements FavoritesRepository {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    @InjectRepository(FavoriteEntity)
    private favRepository: Repository<FavoriteEntity>,
  ) {}

  public async createFavorite(data: FavoriteEntity): Promise<boolean> {
    this.logger.debug(
      `Executing query: createFavorite (${JSON.stringify(data)})`,
    );
    try {
      const favoriteDB = this.favRepository.create(data);
      await this.favRepository.save(favoriteDB);
      return true;
    } catch (e) {
      this.logger.error(
        `Error executing createFavorite (${JSON.stringify(data)}), error: ${e}`,
      );
      return false;
    }
  }

  public async deleteFavorite(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteFavorite (${id})`);
    try {
      await this.favRepository.delete(id);
      return true;
    } catch (e) {
      this.logger.error(`Error executing deleteFavorite (${id}), error: ${e}`);
      return false;
    }
  }

  public async getFavorites(userId: string): Promise<FavoriteEntity[]> {
    this.logger.debug(`Executing query: getFavorites (${userId})`);
    try {
      return await this.favRepository.find({
        where: { user: new ObjectId(userId) },
      });
    } catch (e) {
      this.logger.error(
        `Error executing getFavorites (${userId}), error: ${e}`,
      );
      return null;
    }
  }
}
