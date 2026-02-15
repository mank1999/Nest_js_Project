import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from 'src/users/users.module';
import { PostModule } from 'src/posts/post.module';
import { AuthModule } from 'src/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModules,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        entities: [UserEntity, PostEntity],
        synchronize: true,
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password:config.get('DB_PASS'),
        host: config.get('DB_HOST'),
        database: config.get('DB_NAME'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
