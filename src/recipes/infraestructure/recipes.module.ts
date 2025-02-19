import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './persistence/recipe.entity';
import { RecipesRepository } from '../domain/recipes.repository';
import { RecipesService } from './recipes.service';
import { RecipesApplication } from '../application/recipes.application';
import { RecipesController } from './recipes.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { FavoritesModule } from '../../favorites/infraestructure/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity]),
    SecurityModule,
    FavoritesModule,
  ],
  providers: [
    { provide: RecipesRepository, useClass: RecipesService },
    RecipesApplication,
  ],
  controllers: [RecipesController],
})
export class RecipesModule {}
