import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TradeModule } from './trade/trade.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { SearchModule } from './search/search.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [AuthModule, 
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),

    ReservationModule,


    UserModule,


    TradeModule,


    VehicleModule,


    SearchModule,


    TicketModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule  {}
