import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'task-management',
      autoLoadEntities: true, // finds entity files and loads them automatically
      synchronize: true, // Keeps your database synchronized -> good for development -> not good for production
    }),
    AuthModule,
  ],
})
export class AppModule {}
