import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { parse } from 'pg-connection-string';

// Parse the DATABASE_URL into an object
const databaseUrl = parse(process.env.DATABASE_URL);
const redisUrl = parse(process.env.REDISCLOUD_URL);

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisUrl.host,
      port: parseInt(redisUrl.port),
      password: redisUrl.password,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Always use 'postgres' for Heroku Postgres
      host: databaseUrl.host,
      port: parseInt(databaseUrl.port),
      username: databaseUrl.user,
      password: databaseUrl.password,
      database: databaseUrl.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      retryAttempts: 2,
      retryDelay: 5000,
      ssl: { rejectUnauthorized: false }, // Enable SSL
    }),
    MoviesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}