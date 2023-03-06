import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities:
            configService.get('TYPEORM_AUTOLOAD_ENTITIES') === 'true'
              ? true
              : false, // finds entity files and loads them automatically
          synchronize:
            configService.get('TYPEORM_SYNCRONIZE') === 'true' ? true : false, // Keeps your database synchronized -> good for development -> not good for production
        };
      },
      // You can use the below if you don't want to use ConfigService
      // type: 'postgres',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      // autoLoadEntities:
      //   process.env.TYPEORM_AUTOLOAD_ENTITIES === 'true' ? true : false, // finds entity files and loads them automatically
      // synchronize: process.env.TYPEORM_SYNCRONIZE === 'true' ? true : false, // Keeps your database synchronized -> good for development -> not good for production
    }),
    AuthModule,
  ],
})
export class AppModule {}
