import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from '../domain/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistence/user.entity';
import { UsersController } from './users.controller';
import { ApplicationService } from '../application/application.service';
import { PlansModule } from '../../plans/infraestructure/plans.module';
import { SubscriptionsModule } from '../../subscriptions/infraestructure/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PlansModule,
    SubscriptionsModule,
  ],
  providers: [
    { provide: UsersRepository, useClass: UsersService },
    ApplicationService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
