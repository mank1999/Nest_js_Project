import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from 'src/users/users.module';
import { PostModule } from 'src/posts/post.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [UsersModules, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
