import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMeta } from './entities/historial.entity';
import { CreateHistorialMetaInput } from './dto/create-historial.input';
import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdfkit';

@Injectable()
export class HistorialMetasService {
  constructor(
    @InjectRepository(HistorialMeta)
    private historialMetaRepository: Repository<HistorialMeta>, // Repositorio de HistorialMeta
  ) {}

  // Método para crear un historial de metas
  create(createHistorialMetaInput: CreateHistorialMetaInput): Promise<HistorialMeta> {
    const { tipoEvento, descripcion, montoCambiado, fechaEvento, metaId } = createHistorialMetaInput;
    const newHistorialMeta = this.historialMetaRepository.create({
      tipoEvento,
      descripcion,
      montoCambiado,
      fechaEvento,
      meta: { id: metaId } as any, // Relacionar con la entidad Meta usando el metaId
    });

    return this.historialMetaRepository.save(newHistorialMeta);
  }

  // Método para obtener todos los historiales de metas
  findAll(): Promise<HistorialMeta[]> {
    return this.historialMetaRepository.find({ relations: ['meta'] });
  }

  // Método para obtener un historial de meta por id
  findOne(id: number): Promise<HistorialMeta> {
    return this.historialMetaRepository.findOne({ where: { id }, relations: ['meta'] });
  }
  async remove(id: number): Promise<void> {
    await this.historialMetaRepository.delete(id);
  }

  // Método para generar el reporte PDF del historial de metas
  async generateMetaHistoryReport(historialMetas: HistorialMeta[]): Promise<string> {
    const doc = new pdf();
    const filePath = path.join(__dirname, '../../pdfs', 'historial_metas_report.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    // Título del documento
    doc.fontSize(18).text('Reporte de Historial de Metas', { align: 'center' });
    doc.moveDown();

    // Iterar sobre el historial de metas para generar la información
    historialMetas.forEach((historialMeta, index) => {
      doc.fontSize(14).text(`Evento #${index + 1}`, { underline: true });
      doc.fontSize(12).text(`Tipo de Evento: ${historialMeta.tipoEvento}`);
      doc.text(`Descripción: ${historialMeta.descripcion || 'No disponible'}`);
      doc.text(`Monto Cambiado: ${historialMeta.montoCambiado !== null ? historialMeta.montoCambiado : 'N/A'}`);
      doc.text(`Fecha del Evento: ${new Date(historialMeta.fechaEvento).toLocaleDateString()}`);
      doc.text(`Meta Asociada: ${historialMeta.meta ? historialMeta.meta.nombre : 'No disponible'}`); // Suponiendo que "nombre" es un campo en Meta
      doc.moveDown();
    });

    // Finalizar el documento PDF
    doc.end();

    return filePath;
  }
}
