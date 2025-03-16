import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { ApplicationServices } from '../application/application.services';
import { AuthService } from './auth.service';
import { AuthRepository } from '../domain/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './persistence/auth.entity';
import { PlansModule } from '../../plans/infraestructure/plans.module';
import { SubscriptionsModule } from '../../subscriptions/infraestructure/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    SecurityModule,
    PlansModule,
    SubscriptionsModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: AuthRepository, useClass: AuthService },
    ApplicationServices,
  ],
})
export class AuthModule {}
