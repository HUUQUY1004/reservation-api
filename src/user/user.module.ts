import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminMiddleware } from './user.middleware';
import { routers } from './route';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[
    PrismaModule,
    JwtModule.register({})
  ],
  providers: [
    UserService,
    JwtStrategy
  
  ],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('/user/all')
  }
}
