/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Patch, Delete, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Post()
    async createInvoice(@Body() InvoiceDto: InvoiceDto) {
        return this.invoiceService.createInvoice(InvoiceDto);
    }

    @Get()
    async getAllInvoices(@Query() filters: { startDate?: string; endDate?: string; status?: string }) {
        return this.invoiceService.getAllInvoices(filters);
    }

    @Get(':id')
    async getInvoiceById(@Param('id') id: string) {
        return this.invoiceService.getInvoiceById(id);
    }

    @Patch(':id')
    async updateInvoice(@Param('id') id: string, @Body() InvoiceDto: InvoiceDto) {
        return this.invoiceService.updateInvoice(id, InvoiceDto);
    }

    @Delete(':id')
    async deleteInvoice(@Param('id') id: string) {
        return this.invoiceService.deleteInvoice(id);
    }

    @Post(':invoiceId/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './invoiceUploads',
            filename: (req, file, cb) => {
                const randomName = uuid();
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('invoiceId') invoiceId: string) {
        return this.invoiceService.uploadFile(file, invoiceId);
    }
}
