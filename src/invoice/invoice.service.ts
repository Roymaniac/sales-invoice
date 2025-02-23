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

    async getAllInvoices(filters: { startDate?: string; endDate?: string; status?: string }): Promise<Invoice[]> {
        const { startDate, endDate, status } = filters;
        const where: any = {};

        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate).toISOString(),
                lte: new Date(endDate).toISOString()
            };
        }

        if (status && status !== 'ALL') {
            where.status = status;
        }

        const invoices = await this.prisma.invoice.findMany({
            orderBy: { createdAt: 'desc' },
            where: where,
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
    
    async uploadFile(file: Express.Multer.File, invoiceId: string): Promise<any> {
        try {
            const updatedInvoice = await this.prisma.invoice.update({
              where: { id: invoiceId },
              data: {
                files: {
                  create: {
                    name: `${file.filename}`,
                    url: `${process.env.APP_URL}/${file.filename}`,
                  },
                },
              },
              include: { files: true },
            });
            return updatedInvoice;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
