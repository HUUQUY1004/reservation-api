import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminMiddleware } from 'src/user/user.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,
    JwtModule.register({})
  ],

  controllers: [TradeController],
  providers: [TradeService]
})
export class TradeModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('trade/*')
  }
}
