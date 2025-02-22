/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoiceService {
    constructor(private prisma: PrismaService){}

    async createInvoice(data: InvoiceDto): Promise<Invoice> {
        const newInvoice = await this.prisma.invoice.create({ 
            data: {
                ...data,
                dueDate: new Date(data.dueDate).toISOString(),
                date: new Date(data.date).toISOString()
            }
         });
        return newInvoice;
    }

    async getAllInvoices(): Promise<Invoice[]> {
        const invoices = this.prisma.invoice.findMany({
            orderBy: { createdAt: 'desc' },
            include: { files: true }
        });
        return invoices;
    }


    async getInvoiceById(id: string): Promise<Invoice> {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { files: true }
        });
        return invoice;
    }

    async updateInvoice(id: string, data: InvoiceDto) {
        return this.prisma.invoice.update({
            where: { id },
            data: {
                ...data,
                dueDate: new Date(data.dueDate).toISOString(),
                date: new Date(data.date).toISOString()
            }
        });
    }

    async deleteInvoice(id: string): Promise<void> {
        await this.prisma.invoice.delete({ where: { id }});
    }        
}
