import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from 'src/users/users.module';
import { PostModule } from 'src/posts/post.module';
import { AuthModule } from 'src/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/posts.entity';
@Module({
  imports: [
    UsersModules,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [UserEntity, PostEntity],
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'Manish123',
        host: 'localhost',
        database: 'postgres',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
