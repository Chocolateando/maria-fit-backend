import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './persistence/favorite.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from '../domain/favorites.repository';
import { FavoritesService } from './favorites.service';
import { FavoritesApplication } from '../application/favorites.application';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [
    { provide: FavoritesRepository, useClass: FavoritesService },
    FavoritesApplication,
  ],
  controllers: [FavoritesController],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
