import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './persistence/recipe.entity';
import { RecipesRepository } from '../domain/recipes.repository';
import { RecipesService } from './recipes.service';
import { RecipesApplication } from '../application/recipes.application';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  providers: [
    { provide: RecipesRepository, useClass: RecipesService },
    RecipesApplication,
  ],
  controllers: [RecipesController],
})
export class RecipesModule {}
