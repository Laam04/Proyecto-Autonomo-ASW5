import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deuda } from './entities/deuda.entity';
import { CreateDeudaInput } from './dto/create-deuda.input';
import { UpdateDeudaInput } from './dto/update-deuda.input';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class DeudasService {
  constructor(
    @InjectRepository(Deuda)
    private readonly deudasRepository: Repository<Deuda>,
  ) {}

  create(createDeudaInput: CreateDeudaInput): Promise<Deuda> {
    const deuda = this.deudasRepository.create(createDeudaInput);
    return this.deudasRepository.save(deuda);
  }

  findAll(): Promise<Deuda[]> {
    return this.deudasRepository.find();
  }

  findOne(id: number): Promise<Deuda> {
    return this.deudasRepository.findOneBy({ id });
  }

  async update(id: number, updateDeudaInput: UpdateDeudaInput): Promise<Deuda> {
    await this.deudasRepository.update(id, updateDeudaInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.deudasRepository.delete(id);
  }

  async generateDeudaReport(deudas: Deuda[]): Promise<string> {
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, '../../pdfs/deudas_report.pdf');

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(16).text('Reporte de Deudas', { align: 'center' });
    doc.moveDown();

    deudas.forEach((deuda) => {
      doc
        .fontSize(12)
        .text(`ID: ${deuda.id}`, { continued: true })
        .text(` - Monto Total: ${deuda.montoTotal}`, { continued: true })
        .text(` - Descripción: ${deuda.descripcion}`, { continued: true })
        .text(` - Fecha Creación: ${deuda.fechaCreacion}`, { continued: true })
        .text(` - Fecha Vencimiento: ${deuda.fechaVencimiento || 'N/A'}`);
      doc.moveDown();
    });

    doc.end();
    return pdfPath;
  }
}
