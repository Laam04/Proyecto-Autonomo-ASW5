import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { CreatePrestamoInput } from './dto/create-prestamo.input';
import { UpdatePrestamoInput } from './dto/update-prestamo.input';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamosRepository: Repository<Prestamo>,
  ) {}

  create(createPrestamoInput: CreatePrestamoInput): Promise<Prestamo> {
    const prestamo = this.prestamosRepository.create(createPrestamoInput);
    return this.prestamosRepository.save(prestamo);
  }

  findAll(): Promise<Prestamo[]> {
    return this.prestamosRepository.find();
  }

  findOne(id: number): Promise<Prestamo> {
    return this.prestamosRepository.findOneBy({ id });
  }

  async update(id: number, updatePrestamoInput: UpdatePrestamoInput): Promise<Prestamo> {
    await this.prestamosRepository.update(id, updatePrestamoInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prestamosRepository.delete(id);
  }

  async generatePrestamoReport(prestamos: Prestamo[]): Promise<string> {
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, '../../pdfs/prestamos_report.pdf');

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(16).text('Reporte de Préstamos', { align: 'center' });
    doc.moveDown();

    prestamos.forEach((prestamo) => {
      doc
        .fontSize(12)
        .text(`ID: ${prestamo.id}`, { continued: true })
        .text(` - Monto: ${prestamo.monto}`, { continued: true })
        .text(` - Fecha Inicio: ${prestamo.fechaInicio}`, { continued: true })
        .text(` - Fecha Fin: ${prestamo.fechaFin}`, { continued: true })
        .text(` - Tasa de Interés: ${prestamo.tasaInteres}`, { continued: true })
        .text(` - Descripción: ${prestamo.descripcion}`);
      doc.moveDown();
    });

    doc.end();
    return pdfPath;
  }
}
