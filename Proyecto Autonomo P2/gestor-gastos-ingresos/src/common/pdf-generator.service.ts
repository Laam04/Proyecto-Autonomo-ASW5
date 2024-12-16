import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingreso } from '../ingresos/entities/ingreso.entity';
import { Gasto } from '../gastos/entities/gasto.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { format } from 'date-fns'; 

@Injectable()
export class PdfGeneratorService {
  constructor(
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
  ) {}

  async generatePdf(): Promise<string> {
    const ingresos = await this.ingresoRepository.find({ relations: ['fuenteIngreso'] });
    const gastos = await this.gastoRepository.find({ relations: ['categoriaGasto'] });
    const doc = new PDFDocument();
    const pdfFolderPath = path.join(__dirname, './pdfs');

    if (!fs.existsSync(pdfFolderPath)) {
      fs.mkdirSync(pdfFolderPath); 
    }

    const filePath = path.join(pdfFolderPath, 'reporte_ingresos_gastos.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(18).text('Reporte de Ingresos y Gastos', { align: 'center' });

    doc.fontSize(14).text('Ingresos', { align: 'left' });
    doc.fontSize(12).text('Descripción | Monto | Fecha | Fuente de Ingreso', { align: 'left' });

    ingresos.forEach((ingreso) => {
      const formattedDate = ingreso.fecha ? format(new Date(ingreso.fecha), 'yyyy-MM-dd') : 'Fecha no disponible';
      doc.text(`${ingreso.nombre} | ${ingreso.monto} | ${formattedDate} | ${ingreso.fuenteIngreso?.nombre ?? 'Sin fuente'}`, { align: 'left' });
    });

    doc.moveDown(); 
    doc.fontSize(14).text('Gastos', { align: 'left' });
    doc.fontSize(12).text('Descripción | Monto | Fecha | Categoría de Gasto', { align: 'left' });

    gastos.forEach((gasto) => {
      const categoriaNombre = gasto.categoriaGasto ? gasto.categoriaGasto.nombre : 'Sin categoría';
      const formattedDate = gasto.fecha ? format(new Date(gasto.fecha), 'yyyy-MM-dd') : 'Fecha no disponible';
      doc.text(`${gasto.descripcion} | ${gasto.monto} | ${formattedDate} | ${categoriaNombre}`, { align: 'left' });
    });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(filePath); 
      });

      writeStream.on('error', (err) => {
        reject(err); 
      });
    });
  }
}
