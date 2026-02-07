import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from 'src/users/users.module';
@Module({
  imports: [UsersModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
