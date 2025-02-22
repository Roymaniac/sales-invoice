/* eslint-disable prettier/prettier */
import { IsString, IsDecimal, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { Status } from '../../common/enums/status.enums';


export class InvoiceDto {
    @IsNotEmpty()
    @IsString()
    invoiceNo: string;

    @IsNotEmpty()
    @IsString()
    customer: string;

    @IsNotEmpty()
    @IsDecimal()
    amount: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsDate()
    dueDate: Date;

    @IsString()
    notes: string;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

}