import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { AdminMiddleware } from 'src/user/user.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({})
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports:[
    TicketService
  ]
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('ticket')
  }
}
