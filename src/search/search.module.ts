import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports:[
    PrismaModule
  ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
