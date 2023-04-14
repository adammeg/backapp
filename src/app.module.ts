import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/models/user.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware';


@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb+srv://MCD:fondative@mcd.cbujrjd.mongodb.net/?retryWrites=true&w=majority"),
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}