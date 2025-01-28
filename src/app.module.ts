import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/infraestructure/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infraestructure/guards/auth.guard';
import { SecurityModule } from './shared/infraestructure/security/security.module';
import { AuthModule } from './auth/infraestructure/auth.module';
import { PlansModule } from './plans/infraestructure/plans.module';
import { SubscriptionsModule } from './subscriptions/infraestructure/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://diegovega097:JWdXp3yMZSjrOVBv@cluster0.84ci4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      useUnifiedTopology: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PlansModule,
    SubscriptionsModule,
    SecurityModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
