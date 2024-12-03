import { Controller, Get } from '@nestjs/common';
import { HistorialMetasService } from './historial.service';
import { HistorialMeta } from './entities/historial.entity';

@Controller('historial')
export class HistorialMetaController {
  constructor(private readonly historialMetasService: HistorialMetasService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const historial: HistorialMeta[] = await this.historialMetasService.findAll();
    return this.historialMetasService.generateMetaHistoryReport(historial);
  }
}
