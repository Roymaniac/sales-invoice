-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT;

-- CreateIndex
CREATE INDEX "file_index" ON "File"("invoiceID");

-- CreateIndex
CREATE INDEX "invoice_index" ON "Invoice"("status", "invoiceNo");
