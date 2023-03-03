import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities:
        process.env.TYPEORM_AUTOLOAD_ENTITIES === 'true' ? true : false, // finds entity files and loads them automatically
      synchronize: process.env.TYPEORM_SYNCRONIZE === 'true' ? true : false, // Keeps your database synchronized -> good for development -> not good for production
    }),
    AuthModule,
  ],
})
export class AppModule {}
