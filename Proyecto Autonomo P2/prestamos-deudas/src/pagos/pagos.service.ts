import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoInput } from './dto/create-pago.input';
import { UpdatePagoInput } from './dto/update-pago.input';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoInput: CreatePagoInput): Promise<Pago> {
    const pago = this.pagoRepository.create(createPagoInput);
    return this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find();
  }

  async findOne(id: number): Promise<Pago> {
    return this.pagoRepository.findOneBy({ id });
  }

  async update(id: number, updatePagoInput: UpdatePagoInput): Promise<Pago> {
    await this.pagoRepository.update(id, updatePagoInput);
    return this.pagoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.pagoRepository.delete(id);
  }

  async generatePagoReport(pagos: Pago[]): Promise<string> {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '../../pdfs/pago_report.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(16).text('Reporte de Pagos', { align: 'center' });
    doc.moveDown();

    pagos.forEach((pago, index) => {
      doc.fontSize(12).text(
        `Pago ${index + 1}:`,
        { align: 'left' }
      );
      doc.text(`Monto: ${pago.monto}`, { align: 'left' });
      doc.text(`Descripción: ${pago.descripcion}`, { align: 'left' });
      doc.text(`Fecha de Pago: ${pago.fechaPago}`, { align: 'left' });
      doc.text(`Fecha de Vencimiento: ${pago.fechaVencimiento}`, { align: 'left' });
      doc.moveDown();
    });

    doc.end();
    return filePath;
  }
}
