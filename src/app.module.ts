import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configSerivce.get('DB_HOST'),
        port: configSerivce.get('DB_PORT'),
        username: configSerivce.get('DB_USERNAME'),
        password: configSerivce.get('DB_PASSWORD'),
        database: configSerivce.get('DB_DATABASE'),
      }),
    }),
    AnswersModule,
    QuestionsModule,
    AuthModule,
  ],
})
export class AppModule {}
