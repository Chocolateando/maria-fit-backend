import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterEntity } from './persistence/filter.entity';
import { FiltersRepository } from '../domain/filters.repository';
import { FiltersService } from './filters.service';
import { FiltersApplication } from '../application/filters.application';
import { FiltersController } from './filters.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [TypeOrmModule.forFeature([FilterEntity]), SecurityModule],
  providers: [
    { provide: FiltersRepository, useClass: FiltersService },
    FiltersApplication,
  ],
  controllers: [FiltersController],
})
export class FiltersModule {}
