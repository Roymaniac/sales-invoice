/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [PrismaModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
