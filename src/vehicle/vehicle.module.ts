import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { AdminMiddleware } from 'src/user/user.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports:[
    TicketModule,
    PrismaModule,
    JwtModule.register({})
  ],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AdminMiddleware).forRoutes('vehicle/*')
  }
}
