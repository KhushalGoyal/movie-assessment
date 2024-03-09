import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, validate, appConfig } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [CommonModule, ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
    load: [appConfig],
    validate
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService<AppConfig>) => ({
      uri: configService.get<string>('URI'),
      dbName: configService.get<string>('DATABASE_NAME'),
    })
  }), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
