import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/infraestructure/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infraestructure/guards/auth.guard';
import { SecurityModule } from './shared/infraestructure/security/security.module';
import { AuthModule } from './auth/infraestructure/auth.module';
import { PlansModule } from './plans/infraestructure/plans.module';
import { SubscriptionsModule } from './subscriptions/infraestructure/subscriptions.module';
import { RecipesModule } from './recipes/infraestructure/recipes.module';
import { FiltersModule } from './filters/infraestructure/filters.module';
import { FavoritesModule } from './favorites/infraestructure/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGO_CONNECTION_STRING'),
        database: configService.get('MONGO_DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        useUnifiedTopology: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PlansModule,
    SubscriptionsModule,
    RecipesModule,
    FiltersModule,
    FavoritesModule,
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
